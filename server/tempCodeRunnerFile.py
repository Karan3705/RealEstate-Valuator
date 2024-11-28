__data_columns=None
# __locations=None
# __model=None
# def get_location_names():
#     return __locations

# def get_estimated_price(location,sqft,bath,bhk):
#     x=np.zeros(len(__data_columns))
#     try:
#         index=__data_columns.index(location.lower())
#     except:
#         index=-1    
#     x[0]=sqft
#     x[1]=bath
#     x[2]=bhk
#     if(index>=0):
#         x[index]=1
    
#     return round(__model.predict([x])[0],2) 

# def load_saved_artifacts():
#     global __data_columns
#     global __locations
#     global __model
#     with open("./artifacts/cols.json","r") as f:
#         __data_columns=json.load(f)['data_columns']
#         __locations=__data_columns[3:]

#     with open("./artifacts/model.pickle","rb") as m:
#         __model=pickle.load(m)    


# if __name__=="__main__":
#     load_saved_artifacts()
#     # print(get_location_names()) 
#     print(get_estimated_price('1st phase jp nagar',1000,2,2))  