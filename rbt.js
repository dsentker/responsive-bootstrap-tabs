const IS_BS4 = typeof bootstrap.Tab.getInstance !== 'function';
const BS_TRIGGER_TARGET_ATTR = IS_BS4 ? 'data-target' : 'data-bs-target';
const rbt = {
    _breakPoint: Number,
    subscribeResizeEvent: function() {
        window.addEventListener("resize", (event) => {
            this.start(this._breakPoint);
        });

        return this;
    },

    start: function(windowBreakpoint = 768) {
        this._breakPoint = windowBreakpoint;
        if (window.innerWidth <= this._breakPoint) {
            this.transformToSelect();
        } else {
            this.destroy();
        }

        return this;
    },

    destroy: function()  {
        document.querySelectorAll('.nav[data-responsive][data-rbt]').forEach(function(tabInstance) {
            tabInstance.style.display = tabInstance.getAttribute('data-rbt-display');
            tabInstance.removeAttribute('data-rbt-display');
            tabInstance.removeAttribute('data-rbt');
        });
        document.querySelectorAll('.rbt-select').forEach(function(selectElement) {
            selectElement.remove();
        });
    },

    handleSelectChange: function(tabInstance, reference) {
        if (!reference.startsWith('#')) {
            document.location = reference;
        } else if (IS_BS4) {
            $(`[${BS_TRIGGER_TARGET_ATTR}="${reference}"]`).tab('show');
        } else {
            const triggerEl = tabInstance.querySelector(`[${BS_TRIGGER_TARGET_ATTR}="${reference}"]`);
            const tabTrigger = new bootstrap.Tab(triggerEl);
            tabTrigger.show();
        }
    },

    transformToSelect: function() {
        const _self = this;
        document.querySelectorAll('.nav[data-responsive]:not([data-rbt])').forEach(function(tabInstance) {
            tabInstance.setAttribute('data-rbt', 'data-rbt');
            tabInstance.setAttribute('data-rbt-display', tabInstance.style.display);
            tabInstance.style.display = 'none';

            const selectElement = document.createElement("select");
            selectElement.classList.add("form-select", "form-control", "rbt-select");

            // For each .nav-link element, create a new <option> element
            const navLinks = tabInstance.querySelectorAll(".nav-link");
            navLinks.forEach(function (navLink) {
                const optionElement = document.createElement("option");
                optionElement.textContent = navLink.textContent;
                optionElement.value = navLink.getAttribute(BS_TRIGGER_TARGET_ATTR) || navLink.getAttribute('href');
                if (navLink.classList.contains('active')) {
                    optionElement.setAttribute('selected', 'selected');
                }
                selectElement.appendChild(optionElement);
                if (navLink.hasAttribute('disabled')) {
                    optionElement.disabled = true;
                }
            });

            selectElement.addEventListener('change', function(e) {
                e.preventDefault();
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                _self.handleSelectChange(tabInstance, selectedOption.value);
            });

            tabInstance.parentNode.insertBefore(selectElement, tabInstance.nextSibling);
        });

        return this;
    }
};