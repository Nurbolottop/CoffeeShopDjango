from django.shortcuts import render
from .models import Setting,About,Slide
# Create your views here.

def index(request):
    setting = Setting.objects.latest("id")
    slide = Slide.objects.all()
    context = {
        "setting":setting,
        "slide": slide,
    }
    return render(request, 'index.html', context)

def about(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'story.html', context)

def menu(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'menu.html', context)


def news(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'news.html', context)

def news_detail(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'news_details.html', context)

def photo(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'photo.html', context)

def contact(request):
    setting = Setting.objects.latest("id")
    about = About.objects.latest("id")
    context = {
        "setting":setting,
        "about": about,
    }
    return render(request, 'contact.html', context)