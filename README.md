# Tax-Forms
## Microservice A - Tax Forms
By Lydia TerBeek | 5/19/2025 | CS361

This Microservice takes a POST HTML request with one of the accepted work-types in the body (w-2, self-emp, owner, student, retired, unemp), and returns the needed and helpful forms in JSON format.

## How to run the microservice:
Start by making sure you have node installed and all the correct node_modules in the same folder as tax-form-microserviceA.mjs. 

Change the PORT in the .env file to your preferred localhost PORT (make sure to update your Vite config file as well if you are using vite for your frontend!). 

Run the microservice by typing in the correct directory:

node tax-form-microserviceA.mjs

It should print that it is listening on the PORT you specified as well as "Watching for changes in work-type.txt".

## A. Request Data
Request data through a POST request (over the port of your choosing) with the user's selected work-type in the body.

## B. Recieve Data
Recieve the data through await-ing the response from the POST call, and store the JSON for displaying later.

### Here's a snippet of important code from my test program that shows how to request AND recieve data:
```
// when the submit button is pressed, it calls requestForm
const requestForm = async () => {
    // it gets the user's selected work-type from a <select> element
    const workType = document.getElementById('work-type').value;

    // then it makes a POST request to '/get-tax-forms'
    const response = await fetch('/get-tax-forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // with the work-type in the body
        body: JSON.stringify({ workType })
    });

    // then it recieves and sets the resulting data to forms
    const data = await response.json();
    setForms(data);
}
```

## C. 
UML Diagram:
![image](https://github.com/user-attachments/assets/c165d586-49c8-45cd-a6e9-d33d2656126b)


## How to Communicate Through .txt File Instead:
If you want to communicate through .txt file instead (not shown in discussion-post video):
Simply have your program write to work-type.txt the work-type you want

ie: w-2

(being careful about weird text stuff and whitespace, don't insert in the terminal, I found that it breaks the file??! If it does break, just delete work-type.txt and make a new file with the same name)

In your console it should detect that there was a change in the .txt file, and print "Work type recieved" (this means it detects the file change)

If you entered a valid work-type it will print "Response written" and write the relevant JSON to response.json where you can access the desired JSON!
