from rest_framework import viewsets
from .serializer import (
    CardSerializer, SectionSerrializer,
    DetailSectionSerializer, ItemSerializer,
    ExcursionSerializer, ImagesExcursionSerializer,
    SectionImageSerializer, SectionImageDetailsSerializer,
    ContactSerializer, ComentarySerializer,
    ReservationSerializer, MedicalFormSerializer
)
from .models import (
    Card, Section, DetailSection, Item,
    Excursion, ImagesExcursion, SectionImage,
    SectionImageDetails, Contact, Comentary,
    Reservation, MedicalForm
)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerrializer

class DetailSectionViewSet(viewsets.ModelViewSet):
    queryset = DetailSection.objects.all()
    serializer_class = DetailSectionSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ExcursionViewSet(viewsets.ModelViewSet):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer

class ImagesExcursionViewSet(viewsets.ModelViewSet):
    queryset = ImagesExcursion.objects.all()
    serializer_class = ImagesExcursionSerializer

class SectionImageViewSet(viewsets.ModelViewSet):
    queryset = SectionImage.objects.all()
    serializer_class = SectionImageSerializer

class SectionImageDetailsViewSet(viewsets.ModelViewSet):
    queryset = SectionImageDetails.objects.all()
    serializer_class = SectionImageDetailsSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentary.objects.all()
    serializer_class = ComentarySerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class MedicalFormViewSet(viewsets.ModelViewSet):
    queryset = MedicalForm.objects.all()
    serializer_class = MedicalFormSerializer