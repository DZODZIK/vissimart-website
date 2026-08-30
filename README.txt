VISSIMART – webová stránka
==========================

Ako otvoriť
-----------
1. Rozbaľte tento ZIP.
2. Otvorte súbor index.html v prehliadači (dvojklik).
3. Prepínač SK / EN je vpravo hore.

Stránky
-------
index.html      Domov
about.html      O mne
gallery.html    Galéria (5 fotiek ku každému obrazu)
custom.html     Obraz na mieru
prints.html     Printy
contact.html    Kontakt
gdpr.html       Ochrana osobných údajov
vop.html        Všeobecné obchodné podmienky

Kontaktný formulár (dôležité)
----------------------------
Formulár posiela e-maily cez súbor send.php na Gmail:
  vissimartsk@gmail.com

Aby to na Websupport fungovalo, musí existovať schránka na vašej doméne.
Websupport neodošle správu, ak From adresa neexistuje.

1. Vo Websupport → E-maily vytvorte schránku:
     info@vissimart.sk
   (môže presmerovať na vissimartsk@gmail.com)

2. Nahrajte celý web vrátane send.php do priečinka web.

3. Na webe vyplňte formulár skúšobnou správou a skontrolujte Gmail
   (aj priečinok Spam).

Ak chcete inú From schránku, upravte v send.php riadok:
  $from = 'info@vissimart.sk';
