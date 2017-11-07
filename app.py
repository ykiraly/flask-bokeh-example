from flask import Flask, render_template, request
from bokeh.embed import components
from bokeh.plotting import figure
from bokeh.resources import INLINE
from bokeh.util.string import encode_utf8
import json
import view_definitions as viewdefs

app = Flask(__name__)

@app.route('/')
def index():
    # grab the static resources
    js_resources = INLINE.render_js()
    css_resources = INLINE.render_css()

    # render template
    html = render_template(
        'index.html',
        js_resources=js_resources,
        css_resources=css_resources,
    )
    return encode_utf8(html)

@app.route('/get_filters/<name>', methods=['GET'])
def get_filters(name):
    return json.dumps(viewdefs.views[name]['filters'])
    
@app.route('/get_view/<name>', methods=['POST'])
def get_view(name):
    arguments = json.loads(request.data)
    view = viewdefs.views[name]['get_view'](arguments)
    # render template
    script, div = components(view)
    html = render_template(
        'chart.html',
        plot_script=script,
        plot_div=div
    )
    return encode_utf8(html)

if __name__ == '__main__':
    app.run(debug=True)
