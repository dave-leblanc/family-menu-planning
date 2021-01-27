# Generated by Django 3.1.5 on 2021-01-27 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0004_auto_20210127_0157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='cooking_method',
            field=models.CharField(blank=True, choices=[('OB', 'Oven Bake'), ('PF', 'Pan Fry'), ('IP', 'Instant Pot'), ('SC', 'Slow Cooker'), ('DF', 'Deep Fry ')], max_length=2, null=True),
        ),
    ]
