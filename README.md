#Web Service
This web service manage pool of child-item.

<br>
[3 OPTIONS:]

1.Do like to item for specific child.

2.Add child to MOM-USER. 

3.Get item By Category and Age.



##Usage:

###To Do like to item for specific child:
<br>
https://webserver1.herokuapp.com/like_child_item/{mom_name}/{child_name}/{item}
Replace:

1. {mom_name} with string (ex: "nili", "hila" ...)

2. {child_name} with string (ex: "ben", "shir" ...)

3. {item} with string (ex: "bilbi", "sinderella" ...)


```
EXAMPLE:
https://webserver1.herokuapp.com/like_child_item/nili/shir/bilbi

JSON response example:

[{
    _id: "575be5a8dcba0f71fd3fc3c2",
    id: 111,
    mom_name: "nili",
    mail: "nili@gmail.com",
    children: [
        {
        child_name: "shir",
        child_age: 10,
        liked_item: [
        "pinokyo",
        **"bilbi"**
        ]
        },
        {
        child_name: "lior",
        child_age: 1,
        liked_item: [
        "dira_leaskir"
        ]
        },
        {
        child_name: "ben",
        child_age: 10,
        liked_item: [
        "dira_leaskir",
        "oof gozal"
        ]
        }
    ]
}]
```


###To Add child to MOM-USER:
<br>
https://webserver1.herokuapp.com/add_child/{mom_id}/{child_name}/{child_age}
Replace:

1. {mom_id} with some number (ex: "111", "222" ...)

2. {child_name} with string (ex: "ben", "shir" ...)

3. {child_age} with number (ex: 3, 4 ...)


```
EXAMPLE:
https://webserver1.herokuapp.com/add_child/111/lian/1
JSON response example:

{
    "_id": {
        "$oid": "575be5a8dcba0f71fd3fc3c2"
    },
    "id": 111,
    "mom_name": "nili",
    "mail": "hila@gmail.com",
    "children": [
        {
            "child_name": "shir",
            "child_age": 10,
            "liked_item": [
                "pinokyo",
                "bilbi"
            ]
        },
        {
            "child_name": "lior",
            "child_age": 1,
            "liked_item": [
                "dira_leaskir"
            ]
        },
        {
            "child_name": "ben",
            "child_age": 10,
            "liked_item": [
                "dira_leaskir",
                "oof gozal"
            ]
        },
        {
           ** "child_name": "lian",**
           ** "child_age": 1,**
           ** "liked_item": []**
        }
    ]
}
```


###To Get item By Category and Age:
<br>
https://webserver1.herokuapp.com/search_item_by_age/{category}/{child_age}

Replace:

1. {category} with string of: books  or  shows  or  songs.

2. {child_age} with number (ex: 3, 4 ...)


```
EXAMPLE:
https://webserver1.herokuapp.com/search_item_by_age/books/7
JSON response example:
[
    {
        _id: "575dc20cdcba0f71fd401fa6",
        id: 1,
        type: "books",
        name: "dira leaskir",
        author: "lea goldberg",
        younge_age: 4,
        old_age: 10,
        img: "dira_leaskir"
    },
    {
        _id: "575dc250dcba0f71fd401fb2",
        id: 2,
        type: "books",
        name: "5balonim",
        author: "gil noiman",
        younge_age: 6,
        old_age: 9,
        img: "5balonim"
    }
]
```
Author

Inbar Takdim