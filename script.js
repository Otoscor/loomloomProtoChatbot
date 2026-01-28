/**
 * loomloom - 챗봇 생성 폼
 * Chatbot Creation Form
 */

class ChatbotForm {
  constructor() {
    this.init();
  }

  init() {
    this.characterCount = 1;
    this.commandCount = 1;
    this.currentEmotionBtn = null; // 현재 선택 중인 감정 버튼
    this.setupCharCounters();
    this.setupHashtags();
    this.setupImageUploads();
    this.setupFormValidation();
    this.setupBackButton();
    this.setupAddCharacter();
    this.setupAddCommand();
    this.setupEmotionSelection();

    // 초기 버튼 텍스트 설정
    this.updateAddButtonState('character');
    this.updateAddButtonState('command');
    this.setupTextareaAutoResize();
    this.setupTagButtons();

    // 샘플 텍스트 데이터 정의
    this.sampleTexts = {
      '캐릭터 이름': ['이수현', '강지우', '엘레나', 'Dr. 베르너', '루나'],
      '한 줄 소개': [
        '당신의 잃어버린 기억을 알고 있는 소꿉친구',
        '미래에서 당신을 지키러 온 안드로이드',
        '숲 속의 신비한 약초상',
        '차가운 도시의 엘리트 변호사',
        '마법 학교의 사고뭉치 천재'
      ],
      '캐릭터 특징 및 성격': [
        '겉으로는 차가워 보이지만, 내 사람에게는 따뜻함. 고양이를 보면 사족을 못 씀. 항상 검은색 옷만 고집함.',
        '감정을 잘 드러내지 않으며 논리적임. 하지만 단 것에 약해서 디저트 앞에서는 무장해제됨.',
        '활발하고 장난기가 많지만, 밤이 되면 우울해지는 이중적인 모습을 보임. 비 오는 날을 싫어함.',
        '고풍스러운 말투를 사용하며 예의가 바름. 그러나 화가 나면 무서운 마법을 사용함.',
        '겁이 많지만 정의로운 성격. 위기의 순간에는 누구보다 용감하게 나섬.'
      ],
      '첫 만남 상황': [
        '비 내리는 편의점 앞, 우산이 없어 곤란해하던 그가 당신에게 조용히 우산을 씌워줍니다.',
        '오래된 도서관의 금지된 구역에서 책을 찾던 중, 당신은 그와 우연히 마주칩니다.',
        '전학 온 첫날, 길을 잃고 헤매는 당신을 발견한 그가 친절하게 학교까지 안내해줍니다.',
        '파티장에서 아무도 말을 걸지 않아 어색해하는 당신에게 그가 샴페인을 건네며 다가옵니다.',
        '깊은 숲 속, 다친 동물을 치료해주던 그가 인기척을 느끼고 경계하며 당신을 바라봅니다.'
      ],
      '배경 설정': [
        '마법과 과학이 공존하는 2077년 네오 서울. 거대한 마천루 사이로 드래곤이 날아다닙니다.',
        '평화로운 시골 마을이지만, 밤이 되면 요괴들이 돌아다니는 세상입니다.',
        '모든 것이 얼어붙은 빙하기. 인류는 지하 도시에서 생존을 이어가고 있습니다.',
        '초능력자들이 관리하는 거대 학원 도시. 당신은 능력이 없는 유일한 전학생입니다.',
        '해적들이 지배하는 대항해시대. 전설의 보물을 찾기 위한 모험이 펼쳐집니다.'
      ],
      '캐릭터 첫 메시지': [
        '안녕? 여기서 뭐 하고 있어?',
        '드디어 찾았다. 너, 나 기억 안 나?',
        '저기... 길 좀 물어봐도 될까요?',
        '멈춰! 거기는 출입 금지 구역이다.',
        '오랜만이야. 잘 지냈어?'
      ]
    };

    this.setupAutoGenerate();
  }

  /**
   * 자동 생성(샘플 텍스트) 기능 설정
   */
  setupAutoGenerate() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.generate-btn');
      if (!btn) return;

      const wrapper = btn.closest('.field-header-with-btn');
      if (!wrapper) return;

      const label = wrapper.querySelector('.field-label')?.textContent.trim();
      const inputWrapper = wrapper.nextElementSibling; // .input-wrapper
      const input = inputWrapper?.querySelector('input, textarea');

      if (input && this.sampleTexts[label]) {
        const samples = this.sampleTexts[label];
        const randomText = samples[Math.floor(Math.random() * samples.length)];
        this.animateText(input, randomText, btn);
      }
    });
  }

  /**
   * 텍스트 타이핑 애니메이션
   */
  animateText(input, text, btn) {
    if (btn.classList.contains('generating')) return;

    btn.classList.add('generating');
    btn.disabled = true;
    input.value = '';

    let index = 0;
    // 타이핑 속도 조절 (ms)
    const speed = 30;

    const type = () => {
      if (index < text.length) {
        input.value += text.charAt(index);
        index++;

        // input 이벤트 트리거 (카운터/높이 조절용)
        input.dispatchEvent(new Event('input', { bubbles: true }));

        // 스크롤을 항상 맨 아래로 (textarea의 경우)
        if (input.tagName === 'TEXTAREA') {
          input.scrollTop = input.scrollHeight;
        }

        setTimeout(type, speed);
      } else {
        btn.classList.remove('generating');
        btn.disabled = false;

        // 마지막 한번 더 트리거
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    type();
  }
  setupTagButtons() {
    // 기존 및 동적으로 추가되는 태그 버튼 처리를 위해 문서 전체에 이벤트 위임
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag-btn')) {
        const btn = e.target;
        const wrapper = btn.closest('.input-wrapper');
        if (!wrapper) return;

        const textarea = wrapper.querySelector('.textarea-input');
        if (!textarea) return;

        const tagText = btn.textContent;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        // 텍스트 삽입
        textarea.value = textarea.value.substring(0, startPos) +
          tagText +
          textarea.value.substring(endPos, textarea.value.length);

        // 커서 위치 이동
        textarea.selectionStart = startPos + tagText.length;
        textarea.selectionEnd = startPos + tagText.length;

        // 포커스 유지
        textarea.focus();

        // input 이벤트 트리거 (글자수 카운터 및 높이 조절용)
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  /**
   * 텍스트 영역 자동 높이 조절 설정
   */
  setupTextareaAutoResize() {
    const textareas = document.querySelectorAll('.textarea-input');

    const autoResize = (el) => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };

    textareas.forEach(textarea => {
      // 초기 높이 설정 (내용이 있을 경우)
      if (textarea.value) {
        autoResize(textarea);
      }

      textarea.addEventListener('input', () => {
        autoResize(textarea);
      });
    });
  }

  /**
   * 글자 수 카운터 설정
   */
  setupCharCounters() {
    const inputs = document.querySelectorAll('.text-input[maxlength], .textarea-input[maxlength]');

    inputs.forEach(input => {
      const wrapper = input.closest('.input-wrapper');
      if (!wrapper) return;

      const counter = wrapper.querySelector('.char-counter') ||
        wrapper.parentElement.querySelector('.char-counter');
      if (!counter) return;

      const maxLength = input.getAttribute('maxlength');

      const updateCounter = () => {
        const currentLength = input.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;

        if (currentLength >= maxLength * 0.9) {
          counter.style.color = '#FF4757';
        } else {
          counter.style.color = '#909090';
        }
      };

      input.addEventListener('input', updateCounter);
      updateCounter();
    });
  }

  /**
   * 해시태그 기능 설정
   */
  setupHashtags() {
    const hashtagInput = document.getElementById('hashtagInput');
    const hashtagList = document.getElementById('hashtagList');
    const addBtn = document.querySelector('.hashtag-add-btn');
    const limitDisplay = document.querySelector('.hashtag-counter-inside');

    if (!hashtagInput || !hashtagList) return;

    let hashtags = []; // 초기 태그 없음 (Figma 시안 기준)
    const maxTags = 10;

    const updateDisplay = () => {
      // 리스트 업데이트
      hashtagList.innerHTML = hashtags.map(tag => `
        <span class="hashtag-tag">
          ${tag}
          <button class="hashtag-remove" data-tag="${tag}">×</button>
        </span>
      `).join('');

      // 카운터 업데이트
      if (limitDisplay) {
        limitDisplay.textContent = `${hashtags.length}/${maxTags}`;
      }

      // 삭제 버튼 이벤트
      hashtagList.querySelectorAll('.hashtag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tag = e.currentTarget.dataset.tag; // Use currentTarget for button
          hashtags = hashtags.filter(t => t !== tag);
          updateDisplay();
        });
      });
    };

    const addHashtag = () => {
      let value = hashtagInput.value.trim();
      value = value.replace(/^#/, ''); // # 제거

      if (!value) return;
      if (hashtags.length >= maxTags) {
        this.showToast(`최대 ${maxTags}개까지만 추가할 수 있습니다.`, 'error');
        return;
      }
      if (hashtags.includes(value)) {
        this.showToast('이미 추가된 태그입니다.', 'info');
        return;
      }

      hashtags.push(value);
      hashtagInput.value = '';
      updateDisplay();
    };

    addBtn?.addEventListener('click', addHashtag);
    hashtagInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addHashtag();
      }
    });

    updateDisplay();
  }

  /**
   * 이미지 업로드 설정
   */
  /**
   * 이미지 업로드 설정
   */
  setupImageUploads() {
    const uploadAreas = document.querySelectorAll('.image-upload, .situation-upload');

    uploadAreas.forEach(area => {
      // 초기 상태 저장
      area.dataset.initialContent = area.innerHTML;

      area.addEventListener('click', (e) => {
        // 삭제 버튼 클릭 시
        if (e.target.closest('.image-delete-btn')) {
          e.stopPropagation();
          area.innerHTML = area.dataset.initialContent;
          area.classList.remove('has-image');
          area.style.backgroundImage = '';
          return;
        }

        // 이미지가 있을 때: 변경 버튼을 클릭한 경우에만 업로드 트리거
        // 이미지가 없을 때: 영역 어디든 클릭하면 업로드 트리거
        const isChangeBtn = e.target.closest('.image-change-btn');
        const hasImage = area.classList.contains('has-image');

        if (hasImage && !isChangeBtn) {
          return; // 이미지 자체 클릭 시 무시
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;

          // 파일 크기 체크 (5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert('파일 크기는 5MB 이하여야 합니다.');
            return;
          }

          // 미리보기 표시
          const reader = new FileReader();
          reader.onload = (e) => {
            // 기존 배경 스타일 제거 (img 태그 사용)
            area.style.backgroundImage = '';

            area.classList.add('has-image');
            area.innerHTML = `
              <img src="${e.target.result}" class="image-preview" alt="Preview">
              
              <button type="button" class="image-delete-btn" aria-label="이미지 삭제">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 3L3 9M3 3L9 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              
              <button type="button" class="image-change-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                   <path d="M10 3.5H8.5L7.75 2.25H4.25L3.5 3.5H2C1.72386 3.5 1.5 3.72386 1.5 4V9.5C1.5 9.77614 1.72386 10 2 10H10C10.2761 10 10.5 9.77614 10.5 9.5V4C10.5 3.72386 10.2761 3.5 10 3.5Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
                   <path d="M6 8.5C7.10457 8.5 8 7.60457 8 6.5C8 5.39543 7.10457 4.5 6 4.5C4.89543 4.5 4 5.39543 4 6.5C4 7.60457 4.89543 8.5 6 8.5Z" stroke="white" stroke-width="1.2"/>
                </svg>
                <span>변경</span>
              </button>
            `;
          };
          reader.readAsDataURL(file);
        });

        input.click();
      });
    });
  }

  /**
   * 폼 유효성 검사 설정
   */
  setupFormValidation() {
    const primaryBtn = document.querySelector('.cta-btn.primary');
    const secondaryBtn = document.querySelector('.cta-btn.secondary');

    primaryBtn?.addEventListener('click', () => {
      const requiredFields = document.querySelectorAll('[data-required="true"]');
      let isValid = true;
      let firstInvalid = null;

      // 간단한 유효성 검사 (실제 구현 시 확장 필요)
      const textInputs = document.querySelectorAll('.text-input, .textarea-input');

      // 여기서는 간단히 제출 시뮬레이션
      this.showToast('챗봇을 생성하고 있습니다...', 'info');

      setTimeout(() => {
        this.showToast('챗봇이 성공적으로 생성되었습니다!', 'success');
      }, 2000);
    });

    secondaryBtn?.addEventListener('click', () => {
      this.showToast('임시저장 되었습니다.', 'success');
    });
  }

  /**
   * 뒤로가기 버튼 설정
   */
  setupBackButton() {
    const backBtn = document.querySelector('.back-btn');
    backBtn?.addEventListener('click', () => {
      if (confirm('작성 중인 내용이 저장되지 않습니다. 나가시겠습니까?')) {
        // 실제로는 페이지 이동
        this.showToast('이전 페이지로 이동합니다.', 'info');
      }
    });
  }

  /**
   * 캐릭터 추가 기능 설정
   */
  setupAddCharacter() {
    const addBtn = document.getElementById('addCharacterBtn');
    const container = document.getElementById('characterSectionsContainer');

    if (!addBtn || !container) return;

    addBtn.addEventListener('click', () => {
      this.addCharacterSection(container);
    });

    // 기존 삭제 버튼 이벤트 설정
    this.setupDeleteButtons();
  }

  /**
   * 캐릭터 섹션 추가
   */
  addCharacterSection(container) {
    if (this.characterCount >= 4) {
      this.showToast('최대 4개까지만 추가할 수 있습니다.', 'error');
      return;
    }

    this.characterCount++;
    const existingSection = container.querySelector('.character-section');
    if (!existingSection) return;

    // 섹션 복제
    const newSection = existingSection.cloneNode(true);

    // 인덱스 업데이트
    newSection.dataset.characterIndex = this.characterCount;

    // 제목 업데이트
    const title = newSection.querySelector('.section-title');
    if (title) {
      title.textContent = `캐릭터 설정 ${this.characterCount}`;
    }

    // 삭제 버튼 표시
    const deleteBtn = newSection.querySelector('.delete-character-btn');
    if (deleteBtn) {
      deleteBtn.style.display = 'flex';
    }

    // 입력값 초기화
    newSection.querySelectorAll('input, textarea').forEach(input => {
      input.value = '';
    });

    // 이미지 업로드 초기화
    newSection.querySelectorAll('.image-upload, .situation-upload').forEach(upload => {
      upload.style.backgroundImage = '';
      upload.classList.remove('has-image');

      // 아이콘과 텍스트 복원
      if (upload.classList.contains('situation-upload')) {
        upload.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.75 6L9 2.25L5.25 6" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 2.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>이미지 등록</span>
        `;
      }
    });

    // 카운터 초기화
    newSection.querySelectorAll('.char-counter').forEach(counter => {
      const maxLength = counter.textContent.split('/')[1];
      counter.textContent = `0/${maxLength}`;
      counter.style.color = '#909090';
    });

    // 컨테이너에 추가
    container.appendChild(newSection);

    // 새 섹션의 이벤트 설정
    this.setupNewSectionEvents(newSection);

    // 삭제 버튼 표시 여부 업데이트
    this.updateDeleteButtons();
    this.updateAddButtonState('character');

    // 토스트 메시지
    this.showToast(`캐릭터 ${this.characterCount}이(가) 추가되었습니다.`, 'success');

    // 새 섹션으로 스크롤
    newSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * 명령어 추가 기능 설정
   */
  setupAddCommand() {
    const addBtn = document.getElementById('addCommandBtn');
    const container = document.getElementById('commandSectionsContainer');

    if (!addBtn || !container) return;

    addBtn.addEventListener('click', () => {
      this.addCommandSection(container);
    });

    // 기존 삭제 버튼 이벤트 설정
    this.setupDeleteCommandButtons();
  }

  /**
   * 명령어 섹션 추가
   */
  addCommandSection(container) {
    if (this.commandCount >= 4) {
      this.showToast('최대 4개까지만 추가할 수 있습니다.', 'error');
      return;
    }

    this.commandCount++;
    const existingSection = container.querySelector('.command-section');
    if (!existingSection) return;

    // 섹션 복제
    const newSection = existingSection.cloneNode(true);

    // 인덱스 업데이트
    newSection.dataset.commandIndex = this.commandCount;

    // 제목 업데이트 (필요 시)
    // 명령어 섹션 헤더는 "명령어"로 고정일 수도 있지만, 인덱스를 붙일 수도 있음.
    // 기존 디자인은 그냥 "명령어"였지만 여러 개가 되면 구분이 필요할 수 있음.
    // 하지만 유저 요청은 "캐릭터 추가와 같이"이므로 인덱스를 붙이는 게 자연스러움.
    // 다만 HTML에서 "명령어"라고만 되어있으므로, 일단 그대로 두고 삭제 버튼만 활성화.

    // 삭제 버튼 표시
    const deleteBtn = newSection.querySelector('.delete-command-btn');
    if (deleteBtn) {
      deleteBtn.style.display = 'flex';
    }

    // 입력값 초기화
    newSection.querySelectorAll('input, textarea').forEach(input => {
      input.value = '';
    });

    // 카운터 초기화
    newSection.querySelectorAll('.char-counter').forEach(counter => {
      const maxLength = counter.textContent.split('/')[1];
      counter.textContent = `0/${maxLength}`;
      counter.style.color = '#909090';
    });

    // 컨테이너에 추가
    container.appendChild(newSection);

    // 새 섹션의 이벤트 설정 (글자수 카운터 등)
    this.setupNewSectionEvents(newSection, 'command');

    // 삭제 버튼 및 상태 업데이트
    this.updateDeleteCommandButtons();
    this.updateAddButtonState('command');

    this.showToast('명령어가 추가되었습니다.', 'success');
  }

  /**
   * 추가 버튼 상태(텍스트) 업데이트
   */
  updateAddButtonState(type) {
    const maxCount = 4;
    if (type === 'character') {
      const btn = document.getElementById('addCharacterBtn');
      if (btn) {
        const textSpan = btn.querySelector('span');
        if (textSpan) textSpan.textContent = `캐릭터 추가 (${this.characterCount}/${maxCount})`;
      }
    } else if (type === 'command') {
      const btn = document.getElementById('addCommandBtn');
      if (btn) {
        const textSpan = btn.querySelector('span');
        if (textSpan) textSpan.textContent = `명령어 추가 (${this.commandCount}/${maxCount})`;
      }
    }
  }

  /**
   * 새 섹션의 이벤트 설정 (공통)
   */
  setupNewSectionEvents(section, type = 'character') {
    // 글자 수 카운터
    section.querySelectorAll('.text-input[maxlength], .textarea-input[maxlength]').forEach(input => {
      const wrapper = input.closest('.input-wrapper');
      if (!wrapper) return;

      const counter = wrapper.querySelector('.char-counter') ||
        wrapper.parentElement.querySelector('.char-counter');
      if (!counter) return;

      const maxLength = input.getAttribute('maxlength');

      const updateCounter = () => {
        const currentLength = input.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
        counter.style.color = currentLength >= maxLength * 0.9 ? '#FF4757' : '#909090';
      };

      input.addEventListener('input', updateCounter);
    });

    // 텍스트 영역 자동 높이 조절 (동적 추가)
    section.querySelectorAll('.textarea-input').forEach(textarea => {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });

    if (type === 'character') {
      // 이미지 업로드
      section.querySelectorAll('.image-upload, .situation-upload').forEach(area => {
        const newArea = area.cloneNode(true);
        area.parentNode.replaceChild(newArea, area);

        newArea.addEventListener('click', () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
              alert('파일 크기는 5MB 이하여야 합니다.');
              return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
              newArea.style.backgroundImage = `url(${e.target.result})`;
              newArea.style.backgroundSize = 'cover';
              newArea.style.backgroundPosition = 'center';
              newArea.innerHTML = '';
              newArea.classList.add('has-image');
            };
            reader.readAsDataURL(file);
          });

          input.click();
        });
      });

      // 삭제 버튼
      const deleteBtn = section.querySelector('.delete-character-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          this.deleteCharacterSection(section);
        });
      }
    } else if (type === 'command') {
      const deleteBtn = section.querySelector('.delete-command-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          this.deleteCommandSection(section);
        });
      }
    }
  }

  /**
   * 삭제 버튼 이벤트 설정
   */
  setupDeleteButtons() {
    document.querySelectorAll('.delete-character-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const section = e.target.closest('.character-section');
        if (section) {
          this.deleteCharacterSection(section);
        }
      });
    });
  }

  setupDeleteCommandButtons() {
    document.querySelectorAll('.delete-command-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const section = e.target.closest('.command-section');
        if (section) {
          this.deleteCommandSection(section);
        }
      });
    });
  }

  /**
   * 캐릭터 섹션 삭제
   */
  deleteCharacterSection(section) {
    const container = document.getElementById('characterSectionsContainer');
    const sections = container.querySelectorAll('.character-section');

    if (sections.length <= 1) {
      this.showToast('최소 1개의 캐릭터가 필요합니다.', 'error');
      return;
    }

    // 삭제 애니메이션
    section.classList.add('removing');

    setTimeout(() => {
      section.remove();
      this.characterCount--; // 카운트 감소
      this.updateDeleteButtons();
      this.renumberCharacterSections();
      this.updateAddButtonState('character'); // 버튼 텍스트 업데이트
      this.showToast('캐릭터가 삭제되었습니다.', 'info');
    }, 300);
  }

  /**
   * 명령어 섹션 삭제
   */
  deleteCommandSection(section) {
    const container = document.getElementById('commandSectionsContainer');
    const sections = container.querySelectorAll('.command-section');

    if (sections.length <= 1) {
      this.showToast('최소 1개의 명령어가 필요합니다.', 'error');
      return;
    }

    section.classList.add('removing');

    setTimeout(() => {
      section.remove();
      this.commandCount--;
      this.updateDeleteCommandButtons();
      // 명령어는 번호가 없으면 renumber 불필요할 수 있지만 인덱스 관리를 위해 필요
      this.renumberCommandSections();
      this.updateAddButtonState('command');
      this.showToast('명령어가 삭제되었습니다.', 'info');
    }, 300);
  }

  /**
   * 삭제 버튼 표시 업데이트
   */
  updateDeleteButtons() {
    const container = document.getElementById('characterSectionsContainer');
    const sections = container.querySelectorAll('.character-section');

    sections.forEach((section, index) => {
      const deleteBtn = section.querySelector('.delete-character-btn');
      if (deleteBtn) {
        // 캐릭터가 2개 이상일 때만 삭제 버튼 표시
        deleteBtn.style.display = sections.length > 1 ? 'flex' : 'none';
      }
    });
  }

  updateDeleteCommandButtons() {
    const container = document.getElementById('commandSectionsContainer');
    const sections = container.querySelectorAll('.command-section');

    sections.forEach((section, index) => {
      const deleteBtn = section.querySelector('.delete-command-btn');
      if (deleteBtn) {
        deleteBtn.style.display = sections.length > 1 ? 'flex' : 'none';
      }
    });
  }

  /**
   * 캐릭터 섹션 번호 재정렬
   */
  renumberCharacterSections() {
    const container = document.getElementById('characterSectionsContainer');
    const sections = container.querySelectorAll('.character-section');

    sections.forEach((section, index) => {
      const num = index + 1;
      section.dataset.characterIndex = num;

      const title = section.querySelector('.section-title');
      if (title) {
        title.textContent = num === 1 ? '캐릭터 설정' : `캐릭터 설정 ${num}`;
      }
    });
    // this.characterCount = sections.length; // 이미 delete에서 처리함
  }

  renumberCommandSections() {
    const container = document.getElementById('commandSectionsContainer');
    const sections = container.querySelectorAll('.command-section');

    sections.forEach((section, index) => {
      const num = index + 1;
      section.dataset.commandIndex = num;
      // 명령어는 타이틀에 번호가 없음.
    });
  }

  /**
   * 감정 선택 기능 설정
   */
  setupEmotionSelection() {
    const overlay = document.getElementById('emotionOverlay');
    const bottomSheet = document.getElementById('emotionBottomSheet');
    const closeBtn = document.getElementById('emotionCloseBtn');
    const emotionChips = document.querySelectorAll('.emotion-chip');

    if (!overlay || !bottomSheet) return;

    // 감정 선택 버튼 클릭 이벤트 (이벤트 위임)
    document.addEventListener('click', (e) => {
      const emotionBtn = e.target.closest('.emotion-select-btn');
      if (emotionBtn) {
        this.currentEmotionBtn = emotionBtn;
        this.openEmotionSheet();
      }
    });

    // 오버레이 클릭으로 닫기
    overlay.addEventListener('click', () => {
      this.closeEmotionSheet();
    });

    // 닫기 버튼 클릭
    closeBtn?.addEventListener('click', () => {
      this.closeEmotionSheet();
    });

    // 감정 칩 클릭
    emotionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.selectEmotion(chip.dataset.emotion);
      });
    });
  }

  /**
   * 감정 바텀시트 열기
   */
  openEmotionSheet() {
    const overlay = document.getElementById('emotionOverlay');
    const bottomSheet = document.getElementById('emotionBottomSheet');
    const emotionChips = document.querySelectorAll('.emotion-chip');

    // 현재 버튼에 선택된 감정이 있으면 해당 칩 활성화
    const currentEmotion = this.currentEmotionBtn?.dataset.selectedEmotion;
    emotionChips.forEach(chip => {
      chip.classList.toggle('selected', chip.dataset.emotion === currentEmotion);
    });

    overlay.classList.add('active');
    bottomSheet.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 감정 바텀시트 닫기
   */
  closeEmotionSheet() {
    const overlay = document.getElementById('emotionOverlay');
    const bottomSheet = document.getElementById('emotionBottomSheet');

    overlay.classList.remove('active');
    bottomSheet.classList.remove('active');
    document.body.style.overflow = '';
    this.currentEmotionBtn = null;
  }

  /**
   * 감정 선택
   */
  selectEmotion(emotion) {
    if (!this.currentEmotionBtn) return;

    // 버튼 텍스트 및 상태 업데이트
    const textSpan = this.currentEmotionBtn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = emotion;
    }
    this.currentEmotionBtn.dataset.selectedEmotion = emotion;
    this.currentEmotionBtn.classList.add('selected');

    // 바텀시트 닫기
    this.closeEmotionSheet();

    // 토스트 메시지
    this.showToast(`'${emotion}' 감정이 선택되었습니다.`, 'success');
  }

  /**
   * 토스트 메시지 표시
   */
  showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const colors = {
      success: '#4CAF50',
      error: '#FF4757',
      info: '#5A35EC'
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      background-color: ${colors[type]};
      color: white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: toastIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    // 애니메이션 스타일 추가
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new ChatbotForm();
});
