from flask import Flask,request,jsonify
import util
app=Flask(__name__)
util.load_saved_artifacts()

@app.route('/get_location_names')
def get_location_names():
    response=jsonify({
        'locations':util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@app.route('/predict_price',methods=['POST'])

def predict_price():
    total_sqft=float(request.form['total_sqft'])
    location=request.form['location']
    bath=int(request.form['bath'])
    bhk=int(request.form['bhk'])
    response=jsonify({
        'estimated_price':util.get_estimated_price(location,total_sqft,bath,bhk)
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
    


if __name__=="__main__":
    print(util.get_location_names())
    app.run()