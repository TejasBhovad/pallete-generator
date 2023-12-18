// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_shades])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn get_shades(color: String) -> Vec<String> {
    let r = u8::from_str_radix(&color[1..3], 16).unwrap_or(0);
    let g = u8::from_str_radix(&color[3..5], 16).unwrap_or(0);
    let b = u8::from_str_radix(&color[5..7], 16).unwrap_or(0);

    let mut shades = Vec::new();

    for i in (1..=3).rev() {
        // Lighten the color
        let new_r = (r as f32 + (i as f32) * 20.0).min(255.0) as u8;
        let new_g = (g as f32 + (i as f32) * 20.0).min(255.0) as u8;
        let new_b = (b as f32 + (i as f32) * 20.0).min(255.0) as u8;

        let lighter_shade = format!("#{:02X}{:02X}{:02X}", new_r, new_g, new_b);
        shades.push(lighter_shade);
    }

    shades.push(color.clone()); // Push the provided color as the middle shade

    for i in 1..=3 {
        // Darken the color
        let new_r = (r as f32 - (i as f32) * 20.0).max(0.0) as u8;
        let new_g = (g as f32 - (i as f32) * 20.0).max(0.0) as u8;
        let new_b = (b as f32 - (i as f32) * 20.0).max(0.0) as u8;

        let darker_shade = format!("#{:02X}{:02X}{:02X}", new_r, new_g, new_b);
        shades.push(darker_shade);
    }

    shades
}


