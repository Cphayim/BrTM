from flask import Flask

from app.config.setting import IS_DEV

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    # 默认的 host 是 127.0.0.1
    # 由于运行在 Docker 中，外部无法访问到，需要修改 host=0.0.0.0
    app.run(host='0.0.0.0', debug=IS_DEV)
