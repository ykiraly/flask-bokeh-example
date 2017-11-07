from bokeh.embed import components
from bokeh.plotting import figure
from bokeh.resources import INLINE
from bokeh.util.string import encode_utf8

def get_view_regression(filter_values):
    fig = figure(plot_width=600, plot_height=600)
    fig.toolbar.logo = None
    fig.toolbar_location = None
    y1 = [1, 4, 9, 16]
    y2 = [1, 8, 27, 64]
    if (filter_values['model']=='Squared'):
        y3 = y1
        y1 = y2
        y2 = y3
    fig.line(
        x=[1, 2, 3, 4],
        y=[1, 2, 3, 4],
        color='navy'
    )
    fig.circle(x=[1, 2, 3, 4],
        y=y2,
        color='navy', size=5, alpha=0.5)

    return fig

views = {'model':{'filters': {'model': {'type':'single-choice', 
                         'values':['Squared', 'Cubed'],
                         'default_value':'Squared'}}, 
                         'get_view': get_view_regression}}