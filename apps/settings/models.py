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