from flask import Flask
from flask_cors import CORS
import os
import subprocess

from flask import Blueprint, request, jsonify
from flask import  flash, redirect, url_for
import numpy as np

import joblib
from scipy.interpolate import interp1d
import pandas as pd
import argparse

# from api import Timers
UPLOAD_FOLDER = '/opt/videoServer/video/videoserver/public'
DEFAULT_URL = 'http://127.0.0.1:9013/'

app = Flask(__name__, static_url_path='', static_folder='public')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/startSpider",methods=['POST'])
def startSpider():
    url = "https://www.linkedin.com/"
    try:
        url = get_linkedin_url(url, copy.deepcopy(s))
        if len(url) > 0 and url not in LINKS_FINISHED:
            # LINKS_FINISHED.append(url)
            failure = 0
            while failure < 10:
                try:
                    r = s.get(url, timeout=10)
                    r = requests.get(url, timeout=10)
                except:
                    failure += 1
                    continue
                if r.status_code == 200:
                    parse(r.content, url)
                    break
                else:
                    # print '%s %s' % (r.status_code, url)
                    failure += 2
            if failure >= 10:
                pass
                # print 'Failed: %s' % url
    except:
        pass
    return jsonify({
        'success':True,
        'message':"success",
        # 'outlineUrl':f'{DEFAULT_URL}output/{filename_without_ext}/{filename_without_ext}_vibe_result{file_extension}'
    })





if __name__ == '__main__':
    CORS(app, resources=r'/*')
    app.run(host='0.0.0.0', port=9023,debug=True)