from flask import Flask, render_template, request, redirect
import csv

app = Flask(__name__)

# ------------------ HOME PAGE ------------------
@app.route('/')
def home():
    return render_template('index.html')

# ------------------ HIRE SECTION ------------------
@app.route('/hire')
def hire():
    return render_template('hire.html')

@app.route('/submit_hire', methods=['POST'])
def submit_hire():
    data = request.form.to_dict()
    with open('hire_submissions.csv', mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data.keys())
        if file.tell() == 0:
            writer.writeheader()
        writer.writerow(data)
    return redirect('/thankyou')

@app.route('/admin')
def admin_panel():
    submissions = []
    try:
        with open('hire_submissions.csv', mode='r') as file:
            reader = csv.DictReader(file)
            submissions = list(reader)
    except FileNotFoundError:
        pass
    return render_template('admin.html', submissions=submissions)

# ✅ NEW: View Hirer Details Route
@app.route('/view_hirers')
def view_hirers():
    submissions = []
    headers = []
    try:
        with open('hire_submissions.csv', mode='r', encoding='utf-8') as file:
            reader = csv.reader(file)
            submissions = list(reader)
            if submissions:
                headers = submissions[0]
                submissions = submissions[1:]
    except FileNotFoundError:
        pass
    return render_template('view_hirers.html', submissions=submissions, headers=headers)

# ------------------ TALENT SUBMISSION SECTION ------------------
@app.route('/submit_talent', methods=['GET', 'POST'])
def submit_talent():
    if request.method == 'POST':
        try:
            talent_data = {
                'name': request.form['name'],
                'profession': request.form['profession'],
                'youtube': request.form['youtube'],
                'instagram': request.form['instagram'],
                'twitter': request.form['twitter'],
                'experience': request.form['experience'],
                'leetcode': request.form.get('leetcode', ''),
                'linkedin': request.form.get('linkedin', ''),
                'gmail': request.form['gmail'],
                'phone': request.form['phone'],
                'address': request.form['address']
            }

            # Write to CSV
            with open('talent_submissions.csv', 'a', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(talent_data.values())

            return redirect('/thank_you')  # redirect to thank you page
        except Exception as e:
            return f"Error occurred: {str(e)}"
    return render_template('submit_talent.html')

@app.route('/view_talents')
def view_talents():
    talents = []
    try:
        with open('talent_submissions.csv', 'r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                talents.append(row)
    except FileNotFoundError:
        pass

    return render_template('view_talents.html', talents=talents)


# ------------------ THANK YOU PAGE ------------------
@app.route('/thankyou')
def thank_you():
    return render_template('thankyou.html')  # Used after HIRE submission

@app.route('/thank_you')
def talent_thank_you():
    return "<h2>Thank you for submitting your talent details!</h2><a href='/'>Back to Home</a>"  # Used after TALENT submission

# ------------------ RUN THE APP ------------------
if __name__ == '__main__':
    app.run(debug=True)
