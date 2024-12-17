from django import forms
from .models import Product


from django import forms
from .models import Product, Sort

class ProductForm(forms.ModelForm):
    sort_name = forms.CharField(label="Сорт", max_length=255)

    class Meta:
        model = Product
        fields = ['name', 'description', 'sort_name','calories','proteins','fats','carbohydrates','image']

    def save(self, *args, **kwargs):
        sort_name = self.cleaned_data.get('sort_name')
        sort, created = Sort.objects.get_or_create(name=sort_name)
        self.instance.sort = sort
        return super().save(*args, **kwargs)



class ProductDeleteForm(forms.Form):
    confirm = forms.BooleanField(label="Подтвердите удаление")
