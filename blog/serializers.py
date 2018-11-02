#файл для конвертации JSON

from rest_framework import serializers
from . import models
from django.contrib.auth.models import User, Group

class PostSerializer(serializers.HyperlinkedModelSerializer):
    """docstring forPost Serializer."""

    class Meta:
        fields = ('id', 'title', 'text', 'created', 'last_updated')
        model = models.Post
