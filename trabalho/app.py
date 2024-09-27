from flask import Flask, render_template, request, redirect, url_for
from models import db, Form, Question, Option
from settings import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def create_form():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        
        form = Form(title=title, description=description)
        db.session.add(form)
        db.session.commit()
        
        for i in range(len(request.form.getlist('question_text'))):
            question_text = request.form.getlist('question_text')[i]
            question_type = request.form.getlist('question_type')[i]
            question = Question(form_id=form.id, question_text=question_text, question_type=question_type)
            db.session.add(question)
            db.session.commit()

            if question_type in ['multiple_choice', 'checkbox']:
                options = request.form.getlist(f'options_{i}')
                for option_text in options:
                    option = Option(question_id=question.id, option_text=option_text)
                    db.session.add(option)
        
        db.session.commit()
        return redirect(url_for('creat_form'))

    return render_template('creat_form.html')

if __name__ == '__main__':
    app.run(debug=True)

