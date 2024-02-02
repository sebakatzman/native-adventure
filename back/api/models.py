from django.db import models

# Create your models here.
class Card(models.Model):
    id = models.AutoField(primary_key=True)
    firstTitle = models.CharField(max_length=255)
    secondTitle = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.IntegerField()
    # 'card_images/' es la carpeta donde se almacenarán las imágenes
    image = models.ImageField(upload_to='card_images/')

    def __str__(self):
        return f"{self.firstTitle} - {self.secondTitle}"
        

class Section(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='section_images/')
    icon =  models.FileField(upload_to='archivos_svg/')
    has_excursions = models.BooleanField()
    order = models.PositiveIntegerField(null=True)  # Haciendo el campo "order" único

    def __str__(self):
        return f"{self.name}"

class DetailSection(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title}"

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    detail_section = models.ForeignKey(DetailSection, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"

class Excursion(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    available = models.BooleanField()
    duration = models.CharField(max_length=255)
    quantity_people = models.IntegerField()
    price = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to='excursion_images/')
    description = models.TextField()
    difficulty = models.CharField(max_length=255)
    distance = models.CharField(max_length=255)
    slope = models.CharField(max_length=255)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(null=True)  # Haciendo el campo "order" único

    def __str__(self):
        return f"{self.name}"

class ImagesExcursion(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='excursion_images/')
    excursion = models.ForeignKey(Excursion, on_delete=models.CASCADE)

class SectionImage(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title}"

class SectionImageDetails(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='section_images/')
    section_image = models.ForeignKey(SectionImage, on_delete=models.CASCADE)

# Otros modelos sin cambios...

class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    mail = models.EmailField()
    dni = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    age = models.IntegerField()
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    accommodation = models.CharField(max_length=255)
    excursion = models.ForeignKey(Excursion, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    restriction_dietary = models.CharField(max_length=255)
    menu = models.CharField(max_length=255)

    def __str__(self):
        return f'Reservation {self.id}' 

class MedicalForm(models.Model):
    id = models.AutoField(primary_key=True)
    emergency_contact = models.CharField(max_length=255)
    health_insurance = models.CharField(max_length=255)
    height = models.CharField(max_length=255)
    weight = models.CharField(max_length=255)
    hypertension = models.BooleanField()
    diabetes = models.BooleanField()
    allergic_reactions = models.BooleanField()
    respiratory_diseases = models.BooleanField()
    cardiovascular_diseases = models.BooleanField()
    musculoskeletal_diseases = models.BooleanField()
    phobia_or_fear = models.BooleanField()
    smoking = models.BooleanField()
    alcohol = models.BooleanField()
    exercise_limitation = models.BooleanField()
    other = models.BooleanField()
    any_other_condition = models.CharField(max_length=255)
    any_treatment = models.CharField(max_length=255)
    surgical_procedure = models.CharField(max_length=255)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    

class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=255)
    email = models.EmailField()
    horario1 = models.CharField(max_length=255)
    horario2 = models.CharField(max_length=255)
    horario3 = models.CharField(max_length=255)

    def __str__(self):
        return f"Contact(id={self.id}, direccion={self.direccion}, telefono={self.telefono}, email={self.email}, horario1={self.horario1}, horario2={self.horario2}, horario3={self.horario3})"

class Comentary(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    disabled = models.BooleanField()

    def __str__(self):
        return f"Comentary(id={self.id}, name={self.name}, description={self.description}, disabled={self.disabled})"