/**
 * メニュー追加
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi(); // UIクラス取得

  const get_Menu = ui.createMenu("情報取得"); // メニュー名セット
  get_Menu.addItem("体験会を取得する", "StoresScript.menu_func_1"); // 関数セット

  const ss_Menu = ui.createMenu("スプレッドシート"); // メニュー名セット
  ss_Menu.addItem("変更を適応する", "StoresScript.ss_func_1")

  const custom_menu = ui.createMenu("操作メニュー")
  custom_menu
  .addSubMenu(get_Menu)
  .addSeparator()
  .addSubMenu(ss_Menu)
  .addToUi()
}

function menu_func_1() {
  get_Events()
}

function ss_func_1() {
  change_reserve()
}
