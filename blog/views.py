from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from rest_framework import generics
from rest_framework import viewsets

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.order_by('-created')
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


def index(request):
    #ReactJS version
    return render(request,'blog.html')


def indexv2(request):
    #No ReactJS version
    return render(request,'blog0.html')


@api_view(['POST'])
def PostCreate(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
