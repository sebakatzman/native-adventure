from rest_framework import serializers
from .models import  Card, Section, DetailSection, Item, Excursion, ImagesExcursion, SectionImage, SectionImageDetails, Contact, Comentary, Reservation, MedicalForm

class CardSerializer(serializers.ModelSerializer): 
    class Meta:
        model=Card
        fields='__all__'  #Se serializan todos los datos.

class SectionSerrializer(serializers.ModelSerializer): 
    class Meta:
        model=Section
        fields='__all__'  #Se serializan todos los datos.

        
class DetailSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailSection
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = '__all__'

class ImagesExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesExcursion
        fields = '__all__'

class SectionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionImage
        fields = '__all__'

class SectionImageDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionImageDetails
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class ComentarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentary
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class MedicalFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalForm
        fields = '__all__'