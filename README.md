# Glover
글로벌경영기술대학 X LIKELION


# 개발환경 설정
pipenv shell
pip install -r requirements.txt
python manage.py makemigrations Glover_main
python manage.py migrate

후 db.sqlite3 파일 디코에 올린거로 교체