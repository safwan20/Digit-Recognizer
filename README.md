# Digit-Recognizer

# About dataset  
The dataset has been taken from thttps://www.kaggle.com/c/digit-recognizer.

# About model architecture  
layers : Conv2D-->MaxPool2D-->Dropout-->Conv2D-->MaxPool2D-->Dropout-->Conv2D--->MaxPool2D---->Flatten--->Dense---->Dropout--->Dense  
activation : (relu)                    (relu)                          (relu)                            (relu)                (sigmoid)  
fliter : 32,(5,5)  
pool_size = (2,2)  
input_shape = (28,,3)  
output_shape = 128  
padding="same"

# Metrics  
loss='binary_crossentropy'  
optimizer='adam'  
metrics=['accuracy']  


# Save architecture  
I have used h5 format for saving and later converted into tensorflowjs format inorder for interfernce in javascript.
