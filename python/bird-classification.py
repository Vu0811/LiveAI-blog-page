# import 1 số thư viện cần thiết
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import torch
import torchvision
from torch.utils.data import DataLoader, Dataset
import torchvision.transforms as transforms
import random
import os
from os import system
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.optim import lr_scheduler
import gc
from tqdm.notebook import tqdm
import pickle

import pickle
import sys
with open(os.path.join(os.getcwd(), 'python/CLASSES.pt'), 'rb') as f:
    CLASSES = torch.load(f)
    
import torchvision.models as models
class ResNet_18_TL(nn.Module):
    def __init__(self, num_classes):
        super(ResNet_18_TL, self).__init__()
        self.network = models.resnet18(pretrained=True)
        number_of_features = self.network.fc.in_features
        self.network.fc = nn.Linear(number_of_features, num_classes)
        
    def forward(self, x):
        return self.network(x)
    
    def freeze(self):
        for param in self.network.parameters():
            param.requires_grad= False
        for param in self.network.fc.parameters():
            param.requires_grad= True
        
    def unfreeze(self):
        for param in self.network.parameters():
            param.requires_grad= True
            
def get_model_path(model_name):
    model_path = os.path.join(os.getcwd(), 'python/Model', f'{model_name}.pt')
    return model_path
device = 'cpu'

# ResNet18_Finetune
ResNet18_model = ResNet_18_TL(len(CLASSES))
ResNet18_model.load_state_dict(torch.load(get_model_path('ResNet_18_TL'), map_location=torch.device(device)))

import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from torch.autograd import Variable
import random
import re

from PIL import Image
import PIL
def __predict__(img_path, model):

    # load the image and return the predicted
    img = Image.open(img_path)
    # transform the raw image to normalized 3 x 244 x 244 image
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
        mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    img_tensor = transform(img).float()
    img_tensor.unsqueeze_(0)  # add dimension.
    img_tensor = Variable(img_tensor) #The input to the network needs to be an autograd Variable

    model.eval()
    output = model(img_tensor) # Returns a Tensor of shape (batch, num class labels)

    # Get the prediction corresponding to the max in output array
    predict_index = output.data.numpy().argmax()

    predicted_breed = CLASSES[predict_index]
    
    return predicted_breed

def run(file_path):
    resnet1_pred = __predict__(file_path, ResNet18_model)
    print(resnet1_pred)

for filename in sys.argv[1:]:
    os.system('cls')
    run(f'python/{filename}')     