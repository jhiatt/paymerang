# Jordan's Notes:
Question 1:

For this question I chose browser side Javascript, since this is a relatively low computing power job and this will streamline things a lot.  The idea is that any user can load this data into a website and return the modified results all on the front end.

To run the app for development I set up a python server by running this in the terminal "python -m http.server 8080 &."

I found an inconsistancy on the second payment (not wrapped in a bracket).  I chose to assume that this is a common occurance when there is only one payment so I coded a solution for it.

Returning the result for question 1 was not specified so I chose to return the finished json in a console.log, showing that this data is indeed in the browser and can be used to display data on a page.  In the workplace, my assumption is that the deliverable would be some kind of table on a website and not a raw json file.


Question 2:




# Paymerang Technical Test | Data Analytics
As you know, Paymerang makes payments on behalf of our customers. In the accounts payable world, a single payment often consists of many different invoices.  In the scenario below, one of our customers is providing us payment data in JSON format, but it needs a bit of work.


## Problem 1
The customers JSON data (full snippet is below) does not summarize all invoices for any given payment.  This greatly impacts our finance team by requiring them to do a lot of manual calculations.

Write a function that will aggregate all invoice amounts, `remittance.amount` for each `payment` into a new property named `total_amount` using a technology of your choice.  We use a lot of JavaScript at Paymerang, but you won't be penalized should you chose a different language.

As an example, the first payment includes 2 invoices for $4,000 and $6,000.00.  The function would calculate then add a new key/value pair, `"total_amount": 10000`, like so.

```JSON
{
	"payment": {
		"vendor": {
			"name": "Amazon Web Service, Inc.",
			"address": "410 Terry Avenue North",
			"address2": "",
			"city": "Seattle",
			"state": "WA",
            "zip": "98109-5210",
            "industry": "Computer Integrated Systems Design"
		},
		"remittance": [{
				"invoice_number": "inv# 509193",
				"invoice_date": "2020-09-07",
				"description": "premium support",
				"amount": 4000
			},
			{
				"invoice_number": "inv# 939032",
				"invoice_date": "2020-09-10",
				"description": "hosting fees",
				"amount": 6000
			}
		],
		"total_amount": 10000
	}
}
```
<br>
<details>
<summary>Full Customer JSON file (CLICK TO EXPAND)</summary>

```JSON
[
    {
        "payment": {
            "vendor": {
                "name": "Amazon Web Service, Inc.",
                "address": "410 Terry Avenue North",
                "address2": "",
                "city": "Seattle",
                "state": "WA",
                "zip": "98109-5210",
                "industry": "Computer Integrated Systems Design"
            },
            "remittance": [
                {
                    "invoice_number": "inv# 509193",
                    "invoice_date": "2020-09-07",
                    "description": "premium support",
                    "amount": 4000
                },
                {
                    "invoice_number": "inv# 939032",
                    "invoice_date": "2020-09-10",
                    "description": "hosting fees",
                    "amount": 6000
                }
            ]
        }
    },
    {
        "payment": {
            "vendor": {
                "name": "Tazza",
                "address": "1244 Alverser Plaza,",
                "address2": "",
                "city": "Midlothian",
                "state": "VA",
                "zip": "23113",
                "industry": "Restaurant"
            },
            "remittance": {
                "invoice_number": "20201205",
                "invoice_date": "2020-12-05",
                "description": "Holiday Party",
                "amount": 3200.45
            }
        }
    },
    {
        "payment": {
            "vendor": {
                "name": "Apple",
                "address": "One Infinite Loop",
                "address2": "",
                "city": "Cupertino",
                "state": "CA",
                "zip": "95014",
                "industry": "Software Services"
            },
            "remittance": [
                {
                    "invoice_number": "abcde-1001",
                    "invoice_date": "2020-12-20",
                    "description": "iPhone Xs for staff",
                    "amount": 8020.45
                }
            ]
        }
    },
    {
        "payment": {
            "vendor": {
                "name": "Microsoft",
                "address": "One Microsoft Way",
                "address2": "Suite 1#",
                "city": "Redmond",
                "state": "WA",
                "zip": "98052",
                "industry": "Software Services"
            },
            "remittance": [
                {
                    "invoice_number": "0192-5096",
                    "invoice_date": "2020-12-20",
                    "description": "Microsoft monthly fees | IT",
                    "amount": 900.99
                },
                {
                    "invoice_number": "0192-5097",
                    "invoice_date": "2020-12-18",
                    "description": "Microsoft monthly fees | Finance",
                    "amount": 900.99
                },
                {
                    "invoice_number": "0192-5098",
                    "invoice_date": "2020-12-18",
                    "description": "Microsoft monthly fees | Operations",
                    "amount": 900.99
                },
                {
                    "invoice_number": "0192-5099",
                    "invoice_date": "2020-12-19",
                    "description": "Microsoft monthly fees | Sales",
                    "amount": 900.99
                }
            ]
        }
    },
    {
        "payment": {
            "vendor": {
                "name": "Fraud Busters",
                "address": "123 Fictitious Ln",
                "address2": "",
                "city": "Richmond",
                "state": "VA",
                "zip": "23235",
                "industry": "Security Systems Services"
            },
            "remittance": [
                {
                    "invoice_number": "513",
                    "invoice_date": "2020-12-16",
                    "description": "Fraud analytics software fees",
                    "amount": 100.01
                },
                {
                    "invoice_number": "0192-5097",
                    "invoice_date": "2020-12-18",
                    "description": "Thread detection monitoring fees",
                    "amount": 100.03
                },
                {
                    "invoice_number": "515",
                    "invoice_date": "2020-12-16",
                    "description": "DAST Software",
                    "amount": 100.04
                }
            ]
        }
    },
    {
        "payment": {
            "vendor": {
                "name": "Github",
                "address": "88 Colin P Kelly Junior Street",
                "address2": "",
                "city": "San Franciscoo",
                "state": "CA",
                "zip": "94107",
                "industry": "Software Services"
            },
            "remittance": [
                {
                    "invoice_number": "inv#-20201214-a",
                    "invoice_date": "2020-12-14",
                    "description": "Version Control for AppDev",
                    "amount": 340
                }
            ]
        }
    }
]
```
</details>
<br>

## Problem 2
Now that we've calculated the `total_amount` for each payment. Our finance team would like to see this data represented visually. There are some additonal data points.  Feel free to get creative!

Use the [Kendo Charts JS library](https://docs.telerik.com/kendo-ui/controls/charts/overview) to render a chart type(s) of your choice that best visualizes this data.  A simple web page/app that can be served locally is more than adequate.


## Submission
Upload your code sample to a private Github account and share with the hiring manager, https://github.com/melmendo, or provide a .zip file via email to [hr@paymerang.com](mailto:hr@paymerang.com)
