from os import getenv
from dotenv import load_dotenv

# load env environement
load_dotenv()

environ = {
    "LOAD_MODEL_BY_PYTHON": getenv("LOAD_MODEL_BY_PYTHON", "true") == "true",
}
