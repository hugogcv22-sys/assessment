
        /* ===============================================================
           1. PLUG-AND-PLAY VIDEO LINKS CONFIGURATION
           Paste your final video URLs here OR paste them directly in the UI!
           =============================================================== */
        const VIDEO_LINKS_CONFIG = {
            'moj-reel': localStorage.getItem('trolley_moj_example_v1_url') || '',
            'hero-reel': localStorage.getItem('trolley_hero_pop_art_url') || ''
        };

        /* ===============================================================
           2. 3D SPHERICAL / CYLINDRICAL ORBIT ENGINE + DRAG SUPPORT
           =============================================================== */
        let activeOrbitIndex = 0;
        const totalCards = 5;
        const theta = 360 / totalCards; // 72 degrees per Polaroid
        const radius = 355; // 3D Sphere radius in px

        const orbitLabels = [
            "ACTIVE FRONT PORTAL: 01 // 5-SUBSTACK STORYTELLING ENGINE",
            "ACTIVE FRONT PORTAL: 02 // INSTAGRAM CAROUSEL & 25s REEL",
            "ACTIVE FRONT PORTAL: 03 // 4-TALENT SHORTLIST (WOMEN 40+ / MEN 45+)",
            "ACTIVE FRONT PORTAL: 04 & 05 // 'DONE SWALLOWING IT' CAMPAIGN & MOODBOARD",
            "ACTIVE FRONT PORTAL: 06 & 07 // HERO TEASER & EXECUTIVE DEFENSE"
        ];

        const orbitTargets = ['uni-1', 'uni-2', 'uni-3', 'uni-4', 'uni-6'];

        function updateOrbitPositions() {
            const cards = document.querySelectorAll('.orbit-card');
            cards.forEach((card, index) => {
                // Shortest angular distance from front
                let offset = (index - activeOrbitIndex) % totalCards;
                if (offset < 0) offset += totalCards;

                const angle = offset * theta;
                const rad = (angle * Math.PI) / 180;

                // Spherical / Cylindrical 3D coordinates without distorting card aspect ratio
                const x = Math.sin(rad) * radius;
                const z = Math.cos(rad) * radius - 140;
                const rotY = angle > 180 ? (angle - 360) * 0.55 : angle * 0.55;

                const isFront = offset === 0;
                const scale = isFront ? 1.06 : (z < -150 ? 0.76 : 0.88);

                card.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
                card.style.zIndex = Math.round(z + 500);
                card.style.opacity = isFront ? '1' : (z < -180 ? '0.52' : '0.84');
                card.style.filter = isFront ? 'blur(0px)' : (z < -180 ? 'blur(2.5px)' : 'blur(0.6px)');

                if (isFront) {
                    card.classList.add('is-front');
                } else {
                    card.classList.remove('is-front');
                }
            });

            const labelEl = document.getElementById('orbit-active-label');
            if (labelEl) labelEl.innerText = orbitLabels[activeOrbitIndex];
        }

        function rotateOrbit(direction) {
            activeOrbitIndex = (activeOrbitIndex + direction + totalCards) % totalCards;
            updateOrbitPositions();
        }

        function handlePolaroidClick(index, universeId) {
            if (index !== activeOrbitIndex) {
                activeOrbitIndex = index;
                updateOrbitPositions();
            } else {
                warpToUniverse(universeId);
            }
        }

        function warpActiveFrontCard() {
            warpToUniverse(orbitTargets[activeOrbitIndex]);
        }

        // Mouse & Touch Drag-to-Orbit on the 3D Ring
        let dragStartX = null;
        const orbitWrapper = document.getElementById('orbit-stage-wrapper');

        if (orbitWrapper) {
            orbitWrapper.addEventListener('mousedown', (e) => { dragStartX = e.clientX; });
            window.addEventListener('mouseup', (e) => {
                if (dragStartX === null) return;
                const diff = e.clientX - dragStartX;
                if (Math.abs(diff) > 45) {
                    rotateOrbit(diff < 0 ? 1 : -1);
                }
                dragStartX = null;
            });

            orbitWrapper.addEventListener('touchstart', (e) => { dragStartX = e.touches[0].clientX; }, { passive: true });
            orbitWrapper.addEventListener('touchend', (e) => {
                if (dragStartX === null) return;
                const diff = e.changedTouches[0].clientX - dragStartX;
                if (Math.abs(diff) > 40) {
                    rotateOrbit(diff < 0 ? 1 : -1);
                }
                dragStartX = null;
            });
        }

        // 3D Parallax Mouse Movement on Home Stage
        const portalStage = document.getElementById('portal-stage');
        const deepLayer = document.getElementById('parallax-deep');
        const midLayer = document.getElementById('parallax-mid');

        if (portalStage) {
            portalStage.addEventListener('mousemove', (e) => {
                const x = (window.innerWidth / 2 - e.clientX) / 30;
                const y = (window.innerHeight / 2 - e.clientY) / 30;
                if (deepLayer && midLayer) {
                    deepLayer.style.transform = `translate3d(${x * 1.8}px, ${y * 1.8}px, 0)`;
                    midLayer.style.transform = `translate3d(${-x * 1.2}px, ${-y * 1.2}px, 0)`;
                }
            });
        }

        /* ===============================================================
           3. WARP TRANSITION & UNIVERSE NAVIGATION
           =============================================================== */
        function warpToUniverse(universeId) {
            const portal = document.getElementById('portal-stage');
            portal.classList.add('warp-active');

            setTimeout(() => {
                portal.classList.add('hidden');
                portal.classList.remove('warp-active');
                document.body.classList.add('universe-mode');

                document.getElementById('universe-stage').classList.remove('hidden');
                openUniverse(universeId);
            }, 640);
        }

        function warpFromHud(universeId) {
            const portal = document.getElementById('portal-stage');
            if (!portal.classList.contains('hidden')) {
                warpToUniverse(universeId);
            } else {
                openUniverse(universeId);
            }
        }

        function openUniverse(universeId) {
            document.querySelectorAll('.universe-panel').forEach(p => p.classList.remove('active'));
            const target = document.getElementById(universeId);
            if (target) target.classList.add('active');

            document.querySelectorAll('.hud-btn').forEach(btn => {
                btn.classList.remove('bg-[#1434CB]', 'text-white', 'font-bold');
                btn.classList.add('bg-neutral-800', 'text-neutral-300');
            });
            const activeBtn = document.getElementById('nav-' + universeId);
            if (activeBtn) {
                activeBtn.classList.remove('bg-neutral-800', 'text-neutral-300');
                activeBtn.classList.add('bg-[#1434CB]', 'text-white', 'font-bold');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function returnToPortal() {
            document.body.classList.remove('universe-mode');
            document.getElementById('universe-stage').classList.add('hidden');
            document.getElementById('portal-stage').classList.remove('hidden');
            updateOrbitPositions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        /* ===============================================================
           4. 5-SUBSTACK INTERCONNECTED HYPERLINK ENGINE
           =============================================================== */
        function selectSubstackEdition(edNum) {
            document.querySelectorAll('.substack-article').forEach(art => art.classList.add('hidden'));
            const targetArt = document.getElementById('substack-ed-' + edNum);
            if (targetArt) targetArt.classList.remove('hidden');

            for (let i = 1; i <= 5; i++) {
                const tab = document.getElementById('sub-tab-' + i);
                if (!tab) continue;
                if (i === edNum) {
                    tab.className = "substack-node text-left bg-[#1434CB] border-2 border-[#FFC700] p-3.5 rounded-xl shadow-lg transition transform -translate-y-1";
                } else {
                    tab.className = "substack-node text-left bg-[#0D0E12] border-2 border-neutral-700 hover:border-[#FFC700] p-3.5 rounded-xl transition";
                }
            }
        }

        function jumpToSubstack(edNum, targetElementId) {
            selectSubstackEdition(edNum);
            setTimeout(() => {
                const el = document.getElementById(targetElementId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.remove('flash-target');
                    void el.offsetWidth; // trigger reflow
                    el.classList.add('flash-target');
                }
            }, 120);
        }

        function toggleXRay() {
            const body = document.getElementById('substack-body');
            if (body) body.classList.toggle('xray-active');
        }

        /* ===============================================================
           5. IG CAROUSEL, TALENT FILTER & MOODBOARD AI PROMPT COPIER
           =============================================================== */
        function switchSlide(num) {
            [1, 2, 3].forEach(n => {
                document.getElementById('ig-slide-' + n).classList.add('hidden');
                document.getElementById('slide-btn-' + n).className = 'px-3 py-1 rounded bg-neutral-800 text-neutral-300';
            });
            document.getElementById('ig-slide-' + num).classList.remove('hidden');
            document.getElementById('slide-btn-' + num).className = 'px-3 py-1 rounded bg-[#1434CB] text-white font-bold';
        }

        function filterTalent(category) {
            document.querySelectorAll('.talent-card').forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        function copyPrompt(btnElement) {
            const container = btnElement.closest('.game-card');
            const img = container ? container.querySelector('[data-ai-prompt]') : null;
            const promptText = btnElement.getAttribute('data-ai-prompt') || (img ? img.getAttribute('data-ai-prompt') : '');
            if (promptText && navigator.clipboard) {
                navigator.clipboard.writeText(promptText);
                const original = btnElement.innerText;
                btnElement.innerText = "✓ Prompt Copied!";
                setTimeout(() => { btnElement.innerText = original; }, 1800);
            }
        }

        /* ===============================================================
           6. PLUG-AND-PLAY VIDEO EMBED ENGINE (MP4, DRIVE, LOOM, YOUTUBE)
           =============================================================== */
        function previewMojReelBeat(badge, text, source) {
            document.getElementById('moj-beat-badge').innerText = badge;
            document.getElementById('moj-beat-text').innerText = `"${text}"`;
            document.getElementById('moj-beat-source').innerText = source;
            const video = document.getElementById('moj-reel-video');
            const start = badge.match(/(\d{2}):(\d{2})/);
            if (video && start && !video.classList.contains('hidden') && Number.isFinite(video.duration)) {
                video.currentTime = Number(start[1]) * 60 + Number(start[2]);
            }
        }

        function setHeroEndCard(show) {
            const endCard = document.getElementById('hero-end-card');
            if (endCard) endCard.classList.toggle('hidden', !show);
        }

        const heroFilm = document.getElementById('hero-reel-video');
        if (heroFilm) {
            heroFilm.addEventListener('timeupdate', () => setHeroEndCard(heroFilm.currentTime >= 20));
            heroFilm.addEventListener('seeked', () => setHeroEndCard(heroFilm.currentTime >= 20));
            heroFilm.addEventListener('ended', () => setHeroEndCard(true));
            heroFilm.addEventListener('loadstart', () => setHeroEndCard(false));
        }

        function previewHeroBeat(beatNum, timecode, caption, sourceNote, progressWidth) {
            document.getElementById('player-time-badge').innerText = `BEAT 0${beatNum} // ${timecode}`;
            document.getElementById('player-caption-text').innerText = `"${caption}"`;
            document.getElementById('player-source-note').innerText = sourceNote;
            document.getElementById('player-progress').style.width = progressWidth;
            const card = document.getElementById('player-card-bg');
            if (card) { card.innerText = caption; card.dataset.beat = String(beatNum); }
            setHeroEndCard(beatNum === 5);
            const video = document.getElementById('hero-reel-video');
            if (video && !video.classList.contains('hidden') && Number.isFinite(video.duration)) {
                video.currentTime = [0, 5, 9, 15, 20][beatNum - 1] || 0;
            }

        }

        function formatEmbedUrl(rawUrl) {
            const url = rawUrl.trim();
            if (!url) return null;

            // Loom Share Link -> Embed Link
            if (url.includes('loom.com/share/')) {
                return { type: 'iframe', src: url.replace('loom.com/share/', 'loom.com/embed/') };
            }
            // YouTube / Shorts -> Embed Link
            if (url.includes('youtube.com/watch?v=')) {
                const id = url.split('v=')[1].split('&')[0];
                return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` };
            }
            if (url.includes('youtu.be/')) {
                const id = url.split('youtu.be/')[1].split('?')[0];
                return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` };
            }
            if (url.includes('youtube.com/shorts/')) {
                const id = url.split('shorts/')[1].split('?')[0];
                return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` };
            }
            // Google Drive File Link -> Preview Iframe
            if (url.includes('drive.google.com/file/d/')) {
                const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    return { type: 'iframe', src: `https://drive.google.com/file/d/${match[1]}/preview` };
                }
            }
            // Direct MP4 / MOV / WebM
            return { type: 'video', src: url };
        }

        function embedCustomVideo(prefix, optionalDirectUrl) {
            const inputEl = document.getElementById(`${prefix}-url-input`);
            const rawUrl = optionalDirectUrl || (inputEl ? inputEl.value : '');
            const parsed = formatEmbedUrl(rawUrl);
            if (!parsed) return;

            const videoEl = document.getElementById(`${prefix}-video`);
            const iframeEl = document.getElementById(`${prefix}-iframe`);
            const placeholderEl = document.getElementById(`${prefix}-placeholder`);

            // Save in localStorage so it persists across reloads
            const storageKey = prefix === 'moj-reel' ? 'trolley_moj_example_v1_url' : 'trolley_hero_pop_art_url';
            localStorage.setItem(storageKey, rawUrl);

            if (placeholderEl) placeholderEl.classList.add('hidden');

            if (parsed.type === 'video') {
                if (iframeEl) iframeEl.classList.add('hidden');
                if (videoEl) {
                    videoEl.src = parsed.src;
                    videoEl.classList.remove('hidden');
                    videoEl.load();
                }
            } else {
                if (videoEl) videoEl.classList.add('hidden');
                if (iframeEl) {
                    iframeEl.src = parsed.src;
                    iframeEl.classList.remove('hidden');
                }
            }
        }

        // Initialize 3D Orbit & Stored Videos on Page Load
        // DOM is already mounted when this runs inside the React app
        (() => {
            updateOrbitPositions();
            if (VIDEO_LINKS_CONFIG['moj-reel']) {
                document.getElementById('moj-reel-url-input').value = VIDEO_LINKS_CONFIG['moj-reel'];
                embedCustomVideo('moj-reel', VIDEO_LINKS_CONFIG['moj-reel']);
            }
            if (VIDEO_LINKS_CONFIG['hero-reel']) {
                const heroInput = document.getElementById('hero-reel-url-input');
                if (heroInput) heroInput.value = VIDEO_LINKS_CONFIG['hero-reel'];
                embedCustomVideo('hero-reel', VIDEO_LINKS_CONFIG['hero-reel']);
            }
        })();

        // Expose handlers globally so inline onclick attributes in the
        // injected markup can reach them (the script runs in a local scope).
        Object.assign(window, {
            copyPrompt, embedCustomVideo, filterTalent, handlePolaroidClick,
            jumpToSubstack, previewHeroBeat, previewMojReelBeat, returnToPortal,
            rotateOrbit, selectSubstackEdition, switchSlide, toggleXRay,
            warpActiveFrontCard, warpFromHud, warpToUniverse
        });
    
        document.querySelectorAll('#uni-2 .reel-beat').forEach(beat => beat.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); beat.click(); } }));
