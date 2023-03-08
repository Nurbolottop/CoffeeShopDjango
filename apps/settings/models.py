from django.db import models

# Create your models here.
class Setting(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name="Название сайта"
    )
    descriptions = models.TextField(
        verbose_name="Описание сайта"
    )
    image = models.ImageField(
        upload_to="logo/"
    )
    phone_number = models.CharField(
        max_length=255,
        verbose_name="Телефонный номер",
        blank=True,null=True
    )
    email = models.EmailField(
        verbose_name="Почта",
        blank=True,null=True
    )
    address = models.CharField(
        max_length=255,
        verbose_name="Адрес",
        blank=True,null=True
    )
    facebook = models.URLField(
        verbose_name="Facebook",
        blank=True,null=True
    )
    instagram = models.URLField(
        verbose_name="Instagram",
        blank=True,null=True
    )
    youtube = models.URLField(
        verbose_name="Youtube",
        blank=True,null=True
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Настройки"
        verbose_name_plural = "Настройка"
        
class Slide(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name="Название"
    )
    descriptions = models.TextField(
        verbose_name="Описание"
    )
    image = models.ImageField(
        upload_to="slide_image/",
        verbose_name="Фотография"
    )
    
    def __str__(self):
        return f"{self.title} - {self.descriptions}"
    
    class Meta:
        verbose_name = "Слайды"
        verbose_name_plural = "Слайд"

class About(models.Model):
    title = models.CharField(
        max_length=255,
        verbose_name="О нас"
    )
    descriptions = models.TextField(
        verbose_name="Описание о нас"
    )
    image = models.ImageField(
        upload_to="about/",
        verbose_name="Фотография о нас"
    )
    
    def __str__(self):
        return f"{self.title} - {self.descriptions}"

    class Meta:
        verbose_name = "О нас"
        verbose_name_plural = "О нас"
        