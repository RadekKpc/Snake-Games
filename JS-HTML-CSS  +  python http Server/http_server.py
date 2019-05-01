#!/usr/bin/env python

from http.server import BaseHTTPRequestHandler, HTTPServer
import pickle
# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):

  # GET
  def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
            print("siema")
        try:
            sendReply = False
            if self.path.endswith(".css"):
                mimetype='text/css'
            if self.path.endswith(".html"):
                mimetype='text/html'
                sendReply = True
                print("html")
            if self.path.endswith(".jpg"):
                f = open(self.path[1:], 'rb')
                self.send_response(200)
                self.send_header('Content-type','image/jpg')
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
                return
            if self.path.endswith(".png"):
                f = open(self.path[1:],"rb")
                self.send_response(200)
                self.send_header('Content-type','image/png')
                self.end_headers()
                self.wfile.write(bytes(f.read()))
                f.close()
                return
            if self.path.endswith(".gif"):
                mimetype='image/gif'
                sendReply = True
            if self.path.endswith(".js"):
                mimetype='application/javascript'
                sendReply = True
            if self.path.endswith(".css"):
                mimetype='text/css'
                sendReply = True

            if sendReply == True:
                #Open the static file requested and send it
                # f = open(self.path)
                # self.send_response(200)
                # self.send_header('Content-type',mimetype)
                # self.end_headers()
                # self.wfile.write(f.read())
                # f.close()
              file_to_open = open(self.path[1:]).read()
              self.send_response(200)
              self.end_headers()
              self.wfile.write(bytes(file_to_open, 'utf-8'))
        except:
            file_to_open = "File not found 404"
            self.send_response(404)



def run():
  print('starting server...')

  # Server settings
  # Choose port 8080, for port 80, which is normally used for a http server, you need root access
  server_address = ('127.0.0.1', 8080)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()


run()