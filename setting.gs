/*
API_KEYやCALENDAR_IDは、流出防止のためスクリプトプロパティにて管理しています。
※絶対にAPI_KEYをここへ記載しないでください。
*/

const SS_ID = PropertiesService.getScriptProperties().getProperty("SS_ID")
const SS_NAME = "[シートの名前]"
const SS_SCHOOL_RESULT = "[シートの名前]"
const SS_SCHOOL_NAME = "[シートの名前]"
const SS_SCHOOL_ROOT = "[シートの名前]"

const SPREADSHEET = SpreadsheetApp.openById(SS_ID)

const API_KEY = PropertiesService.getScriptProperties().getProperty("API_KEY")
const URL = "https://api.stores.dev/reserve/202101/reservations"

const CALENDAR_ID = PropertiesService.getScriptProperties().getProperty("[カレンダーID]"); // シフトカレンダー
const CALENDAR_TEST_ID = PropertiesService.getScriptProperties().getProperty("[テスト用 カレンダーID]"); // テスト用カレンダー

const TODAY = new Date().toLocaleDateString('sv-SE')