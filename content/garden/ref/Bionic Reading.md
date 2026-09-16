---
title: Bionic Reading
source: https://swiatczytnikow.pl/bionic-reading-rewolucyjna-metoda-szybkiego-czytania-czy-sciema-mozemy-to-sprawdzic-na-czytnikach/
author:
  - "[[Robert Drózd]]"
published: 2023-05-26
created: 2026-07-28
description: Research article on bionic fonts
tags:
  - topic/typography
---
**A year ago, a new reading method called Bionic Reading became a hit. It aims to facilitate speed reading with comprehension.**

What is it about?

**The** idea **behind** the **Bionic** Reading **technique** is **to** bold **the** beginning of **each** **word** so that the **reader** **can** **focus** on **them**. The **brain** **then** fills **in** the **rest** of the **word**, allowing **us** **to** read faster . Additionally **,** people **who** **struggle** **with** **attention** **deficits** can focus on **the** text **more** **easily**.

[Bionic Reading](https://bionic-reading.com/), a solution proposed by a Swiss company, has developed into an entire ecosystem. We can download apps for our phones, there's also [a Chrome extension, and](https://chrome.google.com/webstore/detail/bionic-reading/kdfkejelgkdjgfoolngegkhkiecmlflj) [even a ready-made API](https://rapidapi.com/bionic-reading-bionic-reading-default/api/bionic-reading1/) for developers , albeit with some limitations.

For some time now, we've also been able to read texts converted to Bionic Reading on e-readers. How do we send them there, and is it worth it?

***January 2025 update:** For some time now, the feature of converting your own files to Bionic Reading has been a paid feature and requires a Premium account. Is it worth it? I don't plan to use it, but everyone has to judge based on their own needs.*

## Converting to EPUB

We go to the [Bionic Reading app's](https://app.bionic-reading.com/) website, where we have three tabs: one for editing pasted text, one for an attached file, and one for a website. We're interested in the latter.

![](https://swiatczytnikow.pl/wp-content/uploads/2023/05/bionic-plik.png)

We can attach files in DOCX, EPUB, RTF, RTFD, or TXT formats. I uploaded the EPUBs with the new issue of Polityka and Pismo. And after a moment, I can see a preview of the first pages.

We can download such a file in EPUB or PDF format, or send it to Kindle.

![](https://swiatczytnikow.pl/wp-content/uploads/2023/05/bionic-download.png)

In the case of shipping to a Kindle, we will receive a request, as is familiar from bookstores, to provide the address of the reader and to add the sender's address as trusted on the Amazon website.

![](https://swiatczytnikow.pl/wp-content/uploads/2023/05/bionic-send-to-kindle.png)

The company is from Switzerland and is rather trustworthy, but I would like to point out that we should not send content that could cause us trouble if leaked.

For example, a Calibre plugin that converts texts to Bionic Reading would be useful. MobileRead users have been asking for it, but no one has created it yet.

This is, of course, very simple, and writing a script that inserts bold characters (\<b>) where needed would take a skilled programmer literally a moment. However, the creators of this essentially simple concept have filed for patent protection, and no one wants to deal with legal correspondence from Switzerland…

## What does Bionic Reading look like on an e-reader?

This is what a sample article from Scripture looks like on Kindle.

**![](https://swiatczytnikow.pl/wp-content/uploads/2023/05/bionic-reading-pismo.png)**

It's worth noting that if you've enabled **bold fonts** on your e-reader (e.g., the Bold feature on a Kindle), the difference between bold and regular text may not be as noticeable. Some typefaces, such as Caecilia, are naturally slightly bold.

Unfortunately, not every file converts correctly – for example, in Polityka there is "garbage" in the form of HTML entities.

![](https://swiatczytnikow.pl/wp-content/uploads/2023/05/bionic-polityka.png)

The content provider is at fault here – in the EPUB source, I see that some UTF-8 characters (Polish letters, quotation marks) are saved as entities, which is incorrect. Such an EPUB would need to be corrected before sending to the application.

Most importantly – how to read?

While reading, I felt like I was being pushed a bit by these bolded words. And that skimming the text very quickly might actually be more effective.

**But will I convert books for this purpose? Probably not.** Ideally, the reader itself should allow me to select a reading mode that would eliminate the need to load a second copy of the book I already own.

## Does Bionic Reading work?

The Bionic Reading website offers a fairly comprehensive [explanation](https://bionic-reading.com/br-method/) of why this method works. In short, the bolded parts of words help organize saccadic eye movements so that fixations occur precisely in those locations. However, the company promoting this method has not presented any research confirming the effectiveness of their invention in practice.

But what about the community? The creators of the Readwise website [conducted an experiment in June 2022](https://blog.readwise.io/bionic-reading-results/) in which they tested the reading speed of short texts on a group of two thousand people.

And they found that **reading text converted to Bionic Reading was… slower!** The difference is small (around 1%), but statistically significant. However, the level of text comprehension was identical.

But Bionic Reading is not the only solution that promises that changing the appearance of text can make us read faster...

However, the study authors noticed something interesting.

> The number of people who read faster with Bionic Reading was slightly greater (52%) than the number of people who read faster without Bionic Reading (48%). That said, those who read faster with Bionic Reading only picked up 35 words per minute on average. In contrast, those who read faster without Bionic Reading picked up 43 words per minute. It does not appear that when Bionic Reading works, it really works.

So, people for whom the Bionic Reading method worked generally read slower. The explanation for this seems to be that when someone reads quickly, their eye fixations are less frequent, for example, on groups of words, and stopping on each word only slows them down. Does this mean that the slower someone reads, the more BR will be useful? Of course not. But it might be a suggestion worth testing yourself.

Another question is whether BR works differently depending on the language. I wonder if bolding the first part of a word doesn't work better in languages with longer words, like German.

## Do any tricks to help you read faster work?

Back in 2014, [I discussed the Open Dyslexic font](https://swiatczytnikow.pl/opendyslexic-font-ulatwiajacy-czytanie-przy-dysleksji/), which is intended to make reading easier for people struggling with dyslexia. Some time ago, [it even made its way onto the Kindle](https://swiatczytnikow.pl/oprogramowanie-5-7-2-dla-dotykowych-kindle-nowy-ekran-startowy-panel-szybkich-funkcji-font-open-dyslexic/) as one of the standard typefaces.

In 2017 and 2018, [studies](https://www.edutopia.org/article/do-dyslexia-fonts-actually-work/) showed that **reading with "dyslexic fonts" is no faster** than reading with Arial or Times New Roman. Both studies were conducted on printed texts, and the participants were people with dyslexia, the very people for whom these fonts were designed.

Does this mean that all such solutions make no sense?

Research shows that **there's no single way to present text that works for everyone**. Just as you can't say that a particular font is the best and that everyone should read with, say, Futura because it's the most effective. It's simply a matter of individual choice.

Another thing is that **speed and comprehension are not the only things we should keep in mind** – comfort is often also important when reading.

A long time ago, [I described the Spritz app](https://swiatczytnikow.pl/spritz-i-inni-czy-bedziemy-czytali-slowo-po-slowie/), which processes text so that it presents it to us word by word. The concept is called "Rapid Serial Visual Presentation" and has been around for decades. However, even if research shows that we read faster, I'm certain that after an hour of reading, **we'll be significantly more tired** than after an hour of regular reading. Conversely, a specific font can make an article or book easier to digest. It's worth exploring the solutions that best suit us.

Or perhaps the opposite is true? In 2010, an interesting study, [Fortune Favors the Bold (and the Italicized): Effects of Disfluency on Educational Outcomes](https://escholarship.org/uc/item/4wd1s7hj), demonstrated that **harder-to-read fonts facilitated memorization**. In one test, participants who were asked to read texts printed in gray Comic Sans font, among other things, recalled the material 14% more.

Well, based on this, no one will be printing textbooks in gray Comic Sans. At least I hope so.

How do you feel about reading texts adapted by Bionic Reading? Is there anyone who finds them more engaging?

PS. Screenshots [of this article](https://magazynpismo.pl/idee/esej/artur-kurasinski-nowe-technologie-chatgpt-sztuczna-inteligencja/?seo=pw). By the way, I'd like to remind you that the discount code "SWIATCZYTNIKOW" for a year's digital subscription to the magazine is still valid. More in [the April article](https://swiatczytnikow.pl/magazyn-pismo-nowy-numer-na-majowke-i-znizka-na-prenumerate-z-naszym-kodem-80-zl-za-rok/).