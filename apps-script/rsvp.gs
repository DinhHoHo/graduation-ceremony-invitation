/**
 * RSVP endpoint cho thiệp "grad u ate".
 * Dán file này vào Google Sheet: Tiện ích mở rộng → Apps Script → thay toàn bộ Code.gs → Lưu
 * → Triển khai (Deploy) → Tùy chọn triển khai mới → Ứng dụng web
 *   Thực thi dưới dạng: Tôi | Người có quyền truy cập: Bất kỳ ai
 * → copy URL kết thúc bằng /exec và dán vào CONFIG.rsvpEndpoint trong index.html
 *
 * Mỗi tên chỉ được ghi một lần (so khớp không phân biệt hoa thường / khoảng trắng).
 */
const SHEET_NAME = "Sheet1";
const HEADERS = ["Thời gian", "Tên", "Trả lời", "Nguồn"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const name = String(data.name || "").replace(/\s+/g, " ").trim().slice(0, 60);
    const answer = data.answer === "không đến" ? "không đến" : "đến";
    const source = data.source === "typed" ? "tự nhập" : "link có tên";
    if (!name) return json_({ ok: false, error: "missing-name" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

    const key = norm_(name);
    const last = sh.getLastRow();
    if (last > 1) {
      const rows = sh.getRange(2, 2, last - 1, 2).getValues();   // cột Tên, Trả lời
      for (const [n, a] of rows) {
        if (norm_(n) === key) return json_({ ok: true, status: "exists", answer: a });
      }
    }
    sh.appendRow([new Date(), name, answer, source]);
    return json_({ ok: true, status: "added", answer: answer });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, msg: "grad u ate rsvp endpoint" });
}

function norm_(s) {
  return String(s).normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
