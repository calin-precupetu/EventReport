import psycopg2
import random
import datetime

N = 100  
max_users = 30  

lat_min, lat_max = 44.3771, 44.5405
long_min, long_max = 26.0196, 26.2500

event_types = {
    'flood': [
        "Significant water accumulation in urban areas.",
        "Flash flooding reported in several neighborhoods.",
        "Rising water levels impacting local infrastructure.",
        "Emergency response teams deployed for flood rescue.",
        "Flood warnings issued by weather authorities."
    ],
    'accident': [
        "A multi-vehicle collision on a busy road.",
        "A pedestrian was injured in a traffic incident.",
        "Emergency services responded to a road accident.",
        "A bicycle accident involving a motor vehicle.",
        "Several cars involved in a crash at an intersection."
    ],
    'fire': [
        "A warehouse fire caused extensive damage.",
        "Firefighters battled a large apartment fire.",
        "Smoke alarms activated in a commercial building.",
        "An arson investigation is underway after a fire.",
        "Residents evacuated due to a fire in a nearby forest."
    ],
    'protest': [
        "Demonstrators gathered to voice their concerns.",
        "A peaceful protest took place in the city center.",
        "Activists organized a march for climate action.",
        "Public gathering demanding political change.",
        "Students protested for educational reforms."
    ],
    'other': [
        "Unusual activity reported in the local park.",
        "Strange noises heard in a residential area.",
        "Residents reported sightings of a wild animal.",
        "An abandoned vehicle found in the neighborhood.",
        "Community meeting held to discuss local issues."
    ]
}

db_host = '34.155.80.8'
db_port = '5432'
db_name = 'events'  
db_user = 'postgres' 
db_password = 'admin'  

try:
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    cursor = conn.cursor()
    
    for index in range(N):
        coordinate_lat = random.uniform(lat_min, lat_max)
        coordinate_long = random.uniform(long_min, long_max)

        event_type = random.choice(list(event_types.keys()))
        description = random.choice(event_types[event_type]) 
        
        email_user = f"user{(index % max_users) + 1}@example.com"
        
        timestamp = datetime.datetime.now() - datetime.timedelta(days=random.randint(0, 365))

        cursor.execute("""
            INSERT INTO events_frontend (coordinate_lat, coordinate_long, description, email_user, timestamp, type)
            VALUES (%s, %s, %s, %s, %s, %s);
        """, (coordinate_lat, coordinate_long, description, email_user, timestamp, event_type))
    
    conn.commit()
    
    print(f"Inserted {N} events successfully.")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()