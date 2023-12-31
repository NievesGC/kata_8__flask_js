from datetime import date
import os
import sqlite3

CURRENCIES = ("EUR","USD")

class Movement:
    def __init__(self,input_date,abstract,amount,currency, id = None):
        self.date = input_date
        self.id= id

        self.abstract = abstract

        self.amount = amount 
        self.currency = currency

    @property
    def date(self):
        return self._date
    
    @date.setter
    def date(self,value):
        self._date = date.fromisoformat(value)
        if self._date > date.today():
            raise ValueError("la fecha debe ser anterior al dia de hoy")
        

    @property
    def amount(self):
        return self._amount
    
    @amount.setter
    def amount(self,value):
        self._amount = float(value)
        if self._amount == 0:
            raise ValueError("la cantidad debe ser posiva o negativa")
        #self._amount = value

    @property
    def currency(self):
        return self._currency
    
    @currency.setter
    def currency(self,value):
        self._currency =  value
        if self._currency not in CURRENCIES:
            raise ValueError(f"currency must be in {CURRENCIES}")
    
    def __eq__(self,other):
        return self.date == other.date and self.abstract == other.abstract and self.amount == other.amount and self.currency == other.currency
    
    def to_dict(self):
        return{
            "id": str(self.id),
            "date": str(self.date),
            "abstract": str(self.abstract),
            "amount": str(self.amount),
            "currency": str(self.currency)
        }
    
class MovementDAOsqlite:
    def __init__(self,db_path):
        self.path = db_path

        query = """
        CREATE TABLE IF NOT EXISTS "movements" (
            "id"	INTEGER UNIQUE,
            "date"	TEXT NOT NULL,
            "abstract"	TEXT NOT NULL,
            "amount"	REAL NOT NULL,
            "currency"	TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
        """
    
        conn = sqlite3.connect(self.path)
        cur = conn.cursor()
        cur.execute(query)
        conn.close()

    def insert(self, movement):
        
        query = """
        INSERT INTO movements
            (date,abstract,amount,currency)
        VALUES(?,?,?,?) 
        """
        #CON DATOS DINAMISCOS LAS ?? LSO DATOS VAN A VENIR DADOS POR MOVEMENTS

        conn = sqlite3.connect(self.path)
        cur = conn.cursor()
        cur.execute(query,(movement.date,movement.abstract,movement.amount,movement.currency))
        conn.commit()
        conn.close()
    
    def get(self,id):
        query = """
        SELECT  date,abstract,amount,currency,id
         FROM movements
        WHERE id = ?;
        """
        conn = sqlite3.connect(self.path)
        cur = conn.cursor()
        cur.execute(query,(id,))
        res = cur.fetchone()
        conn.close()
        if res:
            return Movement(*res) # el asterisco delante va descomponer en iitems
        
    def get_all(self):
        query = """
        SELECT date,abstract,amount,currency,id
         FROM movements
         ORDER by date;
        """
        conn = sqlite3.connect(self.path)
        cur = conn.cursor()
        cur.execute(query)
        res = cur.fetchall()
        """
        lista=[]
        for reg in res:
            lista.append(Movement(*reg))
        """

        lista = []
        for reg in res:
            lista.append(
                {
                "date":reg[0],
                "abstract":reg[1],
                "amount": reg[2],
                "currency":reg[3],
                "id": reg[4]
                 }
            )
       
       
        conn.close()
        return lista
    
    def update(self,id, movement):
        query = """
        UPDATE movements
            SET date = ?, abstract = ?, amount = ?, currency = ?
        WHERE id = ?
        """

        conn = sqlite3.connect(self.path)
        cur = conn.cursor()
        cur.execute(query, (movement.date, movement.abstract, movement.amount, movement.currency, id))
        conn.commit()
        conn.close()