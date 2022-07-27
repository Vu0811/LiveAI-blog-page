---
title: 'Bird Classification Python'
date: 'January 27, 2021'
excerpt: '315 Bird Species Image Classification using Convolutional
Neural Netword, Transfer Learning and Image Retrieval'
cover_image: '/images/posts/img8.jpg'
embedded_program : True
---
# Introduction
Now a day, diversity in bird patterns has become a significant issue for us to tell which kind of bird ones is. Bird are responsive to changes in sensitive ecosystems so that they help us to recognize different life forms on the earth effectively. Due to great species variation, it is difficult for an ordinary person to recognize the sub-category of a bird only by its appearance. However, annotating all the images by classical method such as using illustration books or by person's expert knowledge is extremely hard and exhausting. Thus, an automatic classification system for bird species will be very convenient and useful for many practical applications. For researchers working outdoors, they can easily, immediately identify and classify known bird species by using the system via device like smartphone. For public, the system could provide much fun and arouse peoples interest in birds and could benefits the protection of birds.
# Data Set
In this project, I have used the 315 Bird Species - Classification dataset on Kaggle. This dataset consists of 45980 training images, 1575 testing images and 1575 validation images belonging to 315 bird species. All images are 224 x 224 x 3 color images in jpg format. Images were gather from internet searches by species name, cropped and resized so that the bird occupies at least 50$\%$ of the pixel in the image. Although the training set is not balanced and have a varying number of images per species, each species has at least 120 training images
![](/images/blog/bird-classification/Screenshot-2022-07-27-074202.jpg)
# Purposed apporach
## Convolutional Neural Network
A Convolutional Neural Network (CNN) is a class of deep neural networks, most commonly applied to analyzing visual imagery. They have applications in image and video recognition, recommender systems, image classification, image segmentation, medical image analysis, natural language processing, brain-computer interfaces, and financial time series\cite{cnn_intro}. It was first proposed by Yan Lecun in 1998 for classifying handwriting number and now it is a widely applied deep neural network in the field of computer vision because of these some advantages. The CNN algorithm can avoid the explicit feature extraction, and implicitly to learn from the training data. CNN is also computationally efficient. It uses special convolution and pooling operations and performs parameter sharing. This enables CNN models to run on any device, making them universally attractiv
![](/images/blog/bird-classification/net.jpg)
## Image Retrieval
An image retrieval system is a computer system used for browsing, searching and retrieving images from a large database of digital images.\cite{ir} To solve the bird classification problem, first I need a method to vectorize the input images and build a gallery of vertorized image. Then to predict the label of query image, I vectorize it and find the k most similar vector in the dataset. In this project, I used pre-trained ResNet18 with the absence of last fully connected layer as a vectorization model and I calculated the \textbf{Euclidean distance} between query vector and every vectors in the gallery to get the similarity between the vectors. Finally, I take the k closest vector to the query vector and get the dominant label as the predicted label for query image. The procedure of the method is shown in the picture:
![](/images/blog/bird-classification/imre.jpg)