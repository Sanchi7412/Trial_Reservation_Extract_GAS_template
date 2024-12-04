/*
最終更新 : 2024/05/20

設定を変更する際は、setting.gsですべてコトがつくように作ってあります。
後任がやりやすいように、個々のScriptもなるべく見やすいように記述しました。
質問があれば、以下の人物までご連絡ください。

※このコードは外部公開用に簡素化したコードなので動きません！！

Writing by : StemAcademy システム部 石井優介 [email: yuusuke7412@gmail.com]
*/

function main() {
  Logger.log("===START===")
  
  // STORESからの予約を確認する
  check_reserve()

  // 情報に変更があった情報を書き換える
  change_reserve()

  change_false()

  Logger.log("===END===")
}