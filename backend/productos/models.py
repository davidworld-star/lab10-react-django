from django.db import models


class Producto(models.Model):
    codigo = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.descripcion
