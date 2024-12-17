from .models import Product,Post,News
from django.shortcuts import  get_object_or_404
from django.views.generic import TemplateView,View
from .forms import ProductForm
class MainView(TemplateView):
    template_name = 'base.html'
from django.shortcuts import render, redirect



class ProductCreateView(View):
    def get(self, request):
        form = ProductForm()
        return render(request, 'product_add.html', {'form': form})

    def post(self, request):
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
        return render(request, 'product_add.html', {'form': form})


class ProductDeleteView(View):
    def post(self, request, pk):
        product = get_object_or_404(Product, id=pk)
        product.delete()
        return redirect('product_list')

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def main_page(request):
    filter_type = request.GET.get('type', 'all')
    search_query = request.GET.get('search', '')

    posts = Post.objects.filter(is_active=True)
    news = News.objects.all()

    if search_query:
        posts = posts.filter(title__icontains=search_query)
        news = news.filter(title__icontains=search_query)

    if filter_type == 'posts':
        content = posts
    elif filter_type == 'news':
        content = news
    else:
        content = sorted(
            list(posts) + list(news),
            key=lambda x: x.created_at,
            reverse=True
        )

    page = request.GET.get('page', 1)
    paginator = Paginator(content, 5)

    try:
        content_page = paginator.page(page)
    except PageNotAnInteger:
        content_page = paginator.page(1)
    except EmptyPage:
        content_page = paginator.page(paginator.num_pages)
    context = {
        'content': content_page,
        'filter_type': filter_type,
        'search_query': search_query,
        'page': page,
    }
    return render(request, 'main_page.html', context)