# Generated by Django 3.0.6 on 2020-05-19 14:32

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0018_auto_20200603_0620"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="live_info",
            field=django.contrib.postgres.fields.jsonb.JSONField(
                blank=True,
                help_text="Information needed to manage live streaming",
                null=True,
                verbose_name="Live info",
            ),
        ),
        migrations.AddField(
            model_name="video",
            name="live_state",
            field=models.CharField(
                blank=True,
                choices=[("pending", "pending"), ("live", "live"), ("ended", "ended")],
                help_text="state of the live mode.",
                max_length=20,
                null=True,
                verbose_name="live state",
            ),
        ),
    ]