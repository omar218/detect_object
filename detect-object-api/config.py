from os import getenv
from dotenv import load_dotenv

# load env environement
load_dotenv()

environ = {
    "FRONTEND_HOST": getenv("FRONTEND_HOST", "127.0.0.1"),
    "FRONTEND_PORT": getenv("FRONTEND_PORT", "3000"),
}
