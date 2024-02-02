from django.contrib import admin
from .models import Card, Section, DetailSection, Item, Excursion, ImagesExcursion, SectionImage, SectionImageDetails, Contact, Comentary, Reservation, MedicalForm
from django.contrib.admin import AdminSite

class CustomAdminSite(AdminSite):
    site_title = 'NATIVE-ADVENTURE'
    site_header = 'NATIVE-ADVENTURE'

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ['id', 'firstTitle', 'secondTitle', 'description', 'priority', 'image']

    # # Personaliza los campos de búsqueda si es necesario
    # search_fields = ['firstTitle', 'secondTitle', 'description']

    # # Personaliza los campos de filtrado si es necesario
    # list_filter = ['priority']

    # # Personaliza el orden de visualización de los campos en el formulario de edición
    # fields = ['firstTitle', 'secondTitle', 'description', 'priority', 'image']

    # # Personaliza cómo se muestra la imagen en la lista
    # readonly_fields = ['id']
    # list_display_links = ['id', 'firstTitle']

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'image', 'icon', 'has_excursions', 'order']

    def mostrar_imagen(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" />'
        return 'No Image'

    mostrar_imagen.allow_tags = True
    mostrar_imagen.short_description = 'Imagen'

@admin.register(DetailSection)
class DetailSectionAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'section']

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'detail_section']

@admin.register(Excursion)
class ExcursionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'available', 'duration', 'quantity_people', 'price', 'image', 'description', 'difficulty', 'distance', 'slope', 'section', 'order']

@admin.register(ImagesExcursion)
class ImagesExcursionAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'excursion']

@admin.register(SectionImage)
class SectionImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']

@admin.register(SectionImageDetails)
class SectionImageDetailsAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'section_image']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['id', 'direccion', 'telefono', 'email', 'horario1', 'horario2', 'horario3']

@admin.register(Comentary)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'disabled']

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['id', 'mail', 'dni', 'full_name', 'age', 'date_of_birth', 'nationality', 'phone', 'accommodation', 'excursion', 'reservation_date', 'restriction_dietary', 'menu']

@admin.register(MedicalForm)
class MedicalFormAdmin(admin.ModelAdmin):
    list_display = ['id', 'emergency_contact', 'health_insurance', 'height', 'weight', 'hypertension', 'diabetes', 'allergic_reactions', 'respiratory_diseases', 'cardiovascular_diseases', 'musculoskeletal_diseases', 'phobia_or_fear', 'smoking', 'alcohol', 'exercise_limitation', 'other', 'any_other_condition', 'any_treatment', 'surgical_procedure', 'reservation']

