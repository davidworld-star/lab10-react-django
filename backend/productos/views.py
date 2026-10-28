import json
from decimal import Decimal, InvalidOperation

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Producto


def a_dict(p):
    return {
        "codigo": p.codigo,
        "descripcion": p.descripcion,
        "precio": float(p.precio),
    }


@csrf_exempt
def producto_list(request):
    if request.method == "GET":
        return JsonResponse(
            [a_dict(p) for p in Producto.objects.order_by("codigo")],
            safe=False,
        )

    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON invalido"}, status=400)

        descripcion = (data.get("descripcion") or "").strip()
        if not descripcion:
            return JsonResponse({"error": "La descripcion es obligatoria"}, status=400)

        try:
            precio = Decimal(str(data.get("precio")))
        except (InvalidOperation, TypeError, ValueError):
            return JsonResponse({"error": "El precio debe ser numerico"}, status=400)

        if precio < 0:
            return JsonResponse({"error": "El precio no puede ser negativo"}, status=400)

        producto = Producto.objects.create(descripcion=descripcion, precio=precio)
        return JsonResponse(a_dict(producto), status=201)

    return JsonResponse({"error": "Metodo no permitido"}, status=405)
