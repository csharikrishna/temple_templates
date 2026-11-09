import http.server
import json
import os
import base64
import time
from datetime import datetime

PORT = 3000

class IntakeRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # 1. Individual File Upload Endpoint
        if self.path == '/api/upload':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                os.makedirs("intake_submissions/files", exist_ok=True)
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                fname = data.get('name', 'file')
                b64 = data.get('dataUrl', '')
                if ',' in b64:
                    b64 = b64.split(',', 1)[1]
                file_bytes = base64.b64decode(b64)
                safe_name = f"{timestamp}_{fname}".replace(" ", "_")
                file_path = os.path.join("intake_submissions/files", safe_name)
                with open(file_path, "wb") as f_out:
                    f_out.write(file_bytes)
                
                resp = {
                    "status": "success",
                    "url": f"/{file_path.replace(os.sep, '/')}",
                    "name": fname,
                    "size": f"{len(file_bytes)/(1024*1024):.2f} MB"
                }
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(resp).encode('utf-8'))
                print(f"[Server] Uploaded file: {file_path}")
                return
            except Exception as err:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(err)}).encode('utf-8'))
                return

        # 2. Complete Intake Save Endpoint
        if self.path == '/api/save-intake' or self.path == '/api/save':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                # Create storage folder
                os.makedirs("intake_submissions/files", exist_ok=True)
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                
                # Save uploaded files if any
                saved_files = []
                for f_info in data.get('attached_files', []):
                    fname = f_info.get('name', 'file')
                    b64 = f_info.get('dataUrl', '')
                    if ',' in b64:
                        b64 = b64.split(',', 1)[1]
                    try:
                        file_bytes = base64.b64decode(b64)
                        safe_name = f"{timestamp}_{fname}".replace(" ", "_")
                        file_path = os.path.join("intake_submissions/files", safe_name)
                        with open(file_path, "wb") as f_out:
                            f_out.write(file_bytes)
                        saved_files.append({"original_name": fname, "saved_path": file_path})
                    except Exception as err:
                        print("File save error:", err)
                
                # Save submission JSON
                json_file = f"intake_submissions/submission_{timestamp}.json"
                data['server_saved_at'] = datetime.now().isoformat()
                data['saved_files'] = saved_files
                with open(json_file, "w", encoding="utf-8") as f_json:
                    json.dump(data, f_json, indent=2, ensure_ascii=False)
                    
                response_payload = {
                    "status": "success",
                    "message": "Submission saved successfully to local storage!",
                    "submission_file": json_file,
                    "files_count": len(saved_files)
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
                print(f"[Server] Saved intake submission to {json_file} with {len(saved_files)} file(s)")
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return
                
        # Fallback to standard POST handling
        super().do_POST()

if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), IntakeRequestHandler)
    print(f"BHTCC Dev & Intake Server running at http://127.0.0.1:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
