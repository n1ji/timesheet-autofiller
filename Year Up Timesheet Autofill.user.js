// ==UserScript==
// @name         Year Up Timesheet Autofill
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically fills out the Year Up United Intern Timesheet and Status Report
// @author       You
// @match        https://yearup.tfaforms.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the page to fully load
    window.addEventListener('load', function() {
        if (document.title.includes("Year Up United Intern Timesheet and Status Report")) {
            setTimeout(fillForm, 500);
        }
    });

    function fillForm() {
        //
        fillDay('Monday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        fillDay('Tuesday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        //fillDay('Wednesday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        fillDay('Thursday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        fillDay('Friday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        //fillDay('Saturday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        //fillDay('Sunday', '9:00', 'AM', '5:00', 'PM', '1 Hour');
        // ISEM Yes
        document.getElementById('tfa_147').checked = true;

        // Text fields:
        // Biggest achievement
        document.getElementById('tfa_271').value = "";
        // Work related challenges
        document.getElementById('tfa_272').value = "";
        // How do you plan to grow
        document.getElementById('tfa_273').value = "";

        // Select one of the following questions:
        // tfa_2214 = Write one piece of specific feedback that you received from your supervisor or your internship colleagues this week. It can be a strength or growth area.
        // tfa_2215 = Describe a task or project you worked on this week. What skills did you gain from this task?
        // tfa_2216 = Share feedback you have about your experience working with your internship supervisor.
        // tfa_2217 = Describe a skill that you have gained during your internship. Give specific examples of when you have used that skill.
        // tfa_2218 = What is one new tool (software, hardware or other technology) that you have learned to use on your internship? How and when do you use it?
        document.getElementById('tfa_265').value = "tfa_2215";
        document.getElementById('tfa_2232').value = "";

        // Auto checks no challenges
        document.getElementById('tfa_2221').checked = true;
    }

    function fillDay(day, startTime, startAmPm, endTime, endAmPm, breakTime) {
        const rows = document.querySelectorAll('.gridLayout tr');
        let targetRow = null;

        for (let row of rows) {
            if (row.querySelector('th') && row.querySelector('th').textContent.trim().includes(day)) {
                targetRow = row;
                break;
            }
        }

        if (!targetRow) return;

        const cells = targetRow.querySelectorAll('td');

        if (cells[0]) {
            const startSelect = cells[0].querySelector('select');
            if (startSelect) {
                for (let i = 0; i < startSelect.options.length; i++) {
                    if (startSelect.options[i].text === startTime) {
                        startSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        if (cells[1]) {
            const ampmRadios = cells[1].querySelectorAll('input[type="radio"]');
            if (ampmRadios.length >= 2) {
                if (startAmPm === 'AM') {
                    ampmRadios[0].checked = true;
                } else {
                    ampmRadios[1].checked = true;
                }
            }
        }

        if (cells[2]) {
            const endSelect = cells[2].querySelector('select');
            if (endSelect) {
                for (let i = 0; i < endSelect.options.length; i++) {
                    if (endSelect.options[i].text === endTime) {
                        endSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        if (cells[3]) {
            const ampmRadios = cells[3].querySelectorAll('input[type="radio"]');
            if (ampmRadios.length >= 2) {
                if (endAmPm === 'AM') {
                    ampmRadios[0].checked = true;
                } else {
                    ampmRadios[1].checked = true;
                }
            }
        }

        if (cells[4]) {
            const breakSelect = cells[4].querySelector('select');
            if (breakSelect) {
                for (let i = 0; i < breakSelect.options.length; i++) {
                    if (breakSelect.options[i].text === breakTime) {
                        breakSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        if (cells[0] && cells[0].querySelector('select')) {
            cells[0].querySelector('select').dispatchEvent(new Event('change'));
        }
    }
})();