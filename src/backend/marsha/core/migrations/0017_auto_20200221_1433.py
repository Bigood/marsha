# Generated by Django 3.0.3 on 2020-02-21 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0016_auto_20200402_2047"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="should_use_subtitle_as_transcript",
            field=models.BooleanField(
                default=False,
                help_text="When there is at least one subtitle but no transcript this flag allows to use subtitles as transcripts.",
                verbose_name="use subtitle as transcript",
            ),
        ),
    ]