// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn start_server(app: tauri::AppHandle) -> String {
  let sidecar_command = app
    .shell()
    .sidecar("app")
    .unwrap()
  let output = sidecar_command.output().unwrap();
  let response = String::from_utf8(output.stdout).unwrap();
  response
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
