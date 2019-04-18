Python client for ICanCode
==========================

Installation
------------

1. Requirements: `python3`, `pip`, `virtualenv`
2. To init project

    ```bash
    $ cd project_folder
    $ virtualenv venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt
    ```
    or on windows:
    
    ```
    cd project_folder
    virtualenv venv
    \env\Scripts\activate.bat
    pip install -r requirements
    ```
    
4. After registering in ICanCode server copy host, username and code from browser's address bar into `handler.py` related variables
3. Your code should be implemented in `handler.py` 
4. To start your bot `python -u main.py`
5. See api docs `http://${DOJOSERVER}/codenjoy-contest/resources/icancode/landing-icancode-contest.html`

