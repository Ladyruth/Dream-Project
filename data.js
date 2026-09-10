/**
 * ==============================================================================
 * Centralized Data Store for Dream-project Life Areas
 * ==============================================================================
 * 
 * Each object in this array represents one topic / life question.
 * 
 * WHERE TO ADD / EDIT COPY:
 * - "story": Tab 1 narrative copy ([ 1 Story ])
 * - "thoughts": Tab 2 philosophical reflection copy ([ 2 Thoughts ])
 * - "action": Tab 3 concrete exercise / prompt copy ([ 3 One thing to do ])
 * 
 * CONNECTING TO THE URL:
 * - You can link to any item using: life-area.html?id=<item.id>
 *   (e.g., life-area.html?id=family or life-area.html?id=appearance)
 */

const lifeAreaData = [
    {
        id: "family",
        numericId: "1",
        question: "Why doesn't the life everyone wants for me feel right?",
        figureName: "Rose of Lima",
        image: "images/Frame 42.jpg",
        story: "Imagine a young woman grows up in a comfortable family. She is beautiful, talented, and everyone assumes she'll marry well and have a secure future. But the more people admire her life, the more she feels disconnected from it. She isn't interested in status or being admired. Instead, she wants a quiet life where she can help people who are poor and sick. Her parents can't understand why she would reject opportunities that many women dream of. Rather than following the expected path, she chooses to stay single, earns her own living by sewing and gardening, and devotes her life to serving others—even though almost nobody around her understands her decision.",
        thoughts: "The people who love you can still be wrong about what's right for you. A life that looks perfect on paper can still feel wrong. Being admired isn't the same as being fulfilled. Sometimes the hardest part of choosing your own path is disappointing the people you love. You don't need everyone to understand your decisions for them to be the right ones. Trying to make everyone happy is often the fastest way to lose yourself. You don't have to earn the right to choose a different life. Security isn't always the same as happiness. The path that feels most like you may make the least sense to other people. Living someone else's dream is still living someone else's dream. People can mistake your authenticity for rebellion. The right decision doesn't always feel comfortable—it often feels lonely first. Sometimes you only discover who you are after saying 'no' to the life that was planned for you. A meaningful life doesn't have to impress anyone else. There is a difference between being grateful for your opportunities and feeling obligated to live the life they offer.",
        action: "Make two columns: 'Things I do because I truly want them' and 'Things I do because they're expected of me.' Don't change anything yet—just notice the pattern."
    },
    {
        id: "appearance",
        numericId: "2",
        question: "Why do I care so much about how I look?",
        figureName: "Kiki de Montparnasse",
        image: "images/2-appearance.jpg",
        story: "Imagine a woman known everywhere for her beauty. She comes from a respected family, is well educated, and people constantly compliment her appearance. After becoming a widow, she decides she wants a completely different life and applies to become a Zen nun. But every temple refuses her. Not because she isn't capable, but because they believe her beauty would distract everyone around her. Eventually, she permanently scars her own face so people will finally stop seeing only her appearance. Only then is she accepted and able to dedicate her life to learning, teaching, and writing poetry.",
        thoughts: "Looking beautiful and feeling beautiful are not the same thing. Beauty can open doors—but it can also become a cage. There is no age at which you stop deserving to feel beautiful. Chasing beauty can quietly become chasing approval. Your greatest strength may be hidden behind the thing everyone notices first. Other people's prejudice isn't your responsibility to fix. Sometimes the problem isn't your body—it's the story people attach to it. Being underestimated says more about the observer than about you.  You don't have to become smaller to be taken seriously.",
        action: "Spend one day paying attention to how many times you judge your appearance. Instead of correcting yourself, simply notice when it happens and what triggered it."
    },
    {
        id: "purpose",
        numericId: "3",
        question: "Should I quit and do something that actually matters to me?",
        figureName: "Henry David Thoreau",
        image: "images/3-purpose.jpg",
        story: "Imagine a woman born into one of the richest and most influential families in her city. She never has to worry about money. Her future is already planned: marry someone from a good family, have children, manage a beautiful home, and protect the family's reputation. But as she grows older, she can't ignore the feeling that this isn't the life she wants. She admires people who live simply and help others. One night, at eighteen, she quietly leaves her family home with nothing but the clothes she is wearing. Her parents are furious and try to bring her back. Instead of returning, she builds a completely different life based on simplicity, community, and service.",
        thoughts: "There is more than one way to build a meaningful life. The life that makes sense to everyone else may not make sense to you. Sometimes your biggest dream won't fit inside other people's expectations. A comfortable life isn't always a fulfilling one. Security and purpose don't always point in the same direction. It's okay if your definition of success changes over time. Following your values may cost you other people's approval. The people closest to you may need the longest time to understand your choices. Choosing a different path doesn't mean rejecting your family—it means choosing yourself, too. Every meaningful life asks you to give something up. You don't have to keep living a life that no longer feels like yours. The first step toward a new life is often the scariest one.",
        action: "Write down one thing you've always wanted to try but keep postponing. Spend 15 minutes researching what the first real step would be."
    },
    {
        id: "career",
        numericId: "4",
        question: "I have an idea... but who am I to do it?",
        figureName: "Hildegard of Bingen",
        image: "images/4-career.jpg",
        story: "Imagine a woman who is endlessly curious. She writes, composes music, studies medicine, observes nature, and has ideas that surprise everyone around her. The problem is that she lives in a world where women aren't expected to teach, publish, or advise leaders. For years she keeps many of her thoughts to herself because she doubts anyone will take her seriously. Around the age of forty, she finally decides to stop hiding her work. She begins writing, sharing her ideas publicly, and eventually becomes one of the most respected thinkers of her time.",
        thoughts: " Self-doubt doesn't mean your ideas aren't valuable. Confidence often comes after you begin, not before. You don't have to feel ready to have something worth saying. Your ideas deserve a chance before you decide whether they're good enough. Being talented isn't enough—you eventually have to let people see your work. Every expert was once someone sharing their work for the first time. Fear of being judged often grows bigger than the judgment itself. Someone will always disagree with your work. That doesn't make it worthless. You don't have to convince everyone. You only need to reach the people who need what you have to offer. You don't have to figure your life out in your twenties. Your best work may come later than you expect. The way you naturally think may be exactly what makes your work valuable. Your perspective exists because nobody else has lived your life. There is room in the world for another voice—even if yours is different.",
        action: "Share your idea with one trusted person, or publish the smallest possible version of it instead of waiting until it's perfect"
    },
    {
        id: "loss",
        numericId: "5",
        question: "How do I move on after my whole life fell apart?",
        figureName: "Frida Kahlo",
        image: "images/5-loss.jpg",
        story: "Imagine a woman whose husband unexpectedly dies while running a country. Overnight she becomes a single mother, the head of government, and the person responsible for protecting her people from powerful enemies. She is grieving, frightened, and under enormous pressure. At first, she responds with anger and revenge against those responsible for her husband's death. But years later, she makes a turn. She focuses on rebuilding her country, creating better laws, and becoming known as a wise and respected ruler.",
        thoughts: "You don't have to know how you'll rebuild your life before taking the first step. The path becomes clearer while you're walking it. You don't have to have your future figured out to move toward it. A life can fall apart much faster than it can be rebuilt—and that's okay. Survival and healing are different chapters. Your worst season doesn't have to become your permanent identity. Grief changes you, but it doesn't have to define you. Anger isn't wrong. It's what you do with it that shapes your future.  Every emotion deserves to be felt, but not every emotion deserves to make your decisions. Sometimes your first reaction is about survival. Your second is about the person you want to become. You can outgrow the version of yourself that was trying to survive. You are allowed to become a different person after everything you've been through. As long as you're alive, your story is still being written. There is no deadline for rebuilding your life. Even after everything changes, life can still hold purpose.",
        action: "Ask yourself: What's one thing Future Me would thank me for doing today? Then do only that one thing."
    },
    {
        id: "healing",
        numericId: "6",
        question: "Can I ever be happy after everything I've been through?",
        figureName: "Julian of Norwich",
        image: "images/6-healing.jpg",
        story: "Imagine a girl who loses her parents while still very young. With no one left to care for her, she falls into extreme poverty and is eventually sold into slavery. She spends years living without freedom or control over her own life. After finally gaining her freedom, she could have spent the rest of her life chasing money, security, or revenge. Instead, she chooses a simple life devoted to inner peace, compassion, and love. People begin seeking her advice not because of her status, but because of the wisdom she has gained through suffering.",
        thoughts: "What happened to you doesn't have to become who you are. Healing isn't forgetting. It's learning to live without carrying the same weight every day. You don't need to get even to move forward. Peace is something you build, not something that happens to you. The people who hurt you don't deserve to decide the rest of your life. Happiness doesn't erase suffering. It grows beside it. You can become known for more than the hardest thing you've survived. Your past explains you, but it doesn't have to limit you.",
        action: "Notice one moment today that feels even slightly peaceful or pleasant. Don't force happiness—just prove to yourself that it still exists."
    },
    {
        id: "identity",
        numericId: "7",
        question: "Why do I feel like I don't fit into my own life?",
        figureName: "Fernando Pessoa",
        image: "images/7-identity.jpg",
        story: "Imagine a young woman born into one of the most influential families in her country. She has wealth, status, beautiful clothes, and every opportunity to live an easy life. But despite having everything people admire, she constantly feels out of place. The parties, social expectations, and plans others make for her leave her feeling empty. Eventually, she walks away from that privileged world and chooses to live alone in nature. While others see it as giving up everything, she sees it as finally living a life that feels like her own.",
        thoughts: "Sometimes nothing is wrong—and something still isn't right. You can be grateful for your life and still know it's not the life you want. Feeling out of place doesn't always mean something is wrong with you. The life that impresses other people isn't necessarily the life that fulfills you. Belonging starts with belonging to yourself. There is a difference between fitting in and feeling at home. The more you ignore what feels true, the louder it usually becomes. You don't have to explain why something doesn't feel right. Sometimes solitude helps you hear yourself againIt's okay to outgrow places, roles, and identities that once fit you. Choosing a different life doesn't mean your old life was a mistake.",
        action: "Write down one moment this month when you felt most like yourself. Look for what was present in that moment."
    },
    {
        id: "work",
        numericId: "8",
        question: "What if everyone thinks I'm wrong?",
        figureName: "Galileo Galilei",
        image: "images/8-work.jpg",
        story: "Imagine a woman working inside an organization she deeply cares about. Over time, she becomes convinced that things have drifted away from their original purpose. She believes the system needs to change, but many people around her think it's fine as it is. Every attempt she makes to improve it is met with criticism, resistance, and doubt. Even she questions herself at times. Still, she keeps going, slowly building new communities based on the values she believes matter most. Years later, the very ideas people resisted become the reason she's remembered.",
        thoughts: "The majority isn't always right. Just because something has always been done a certain way doesn't mean it's the best way. New ideas almost always feel uncomfortable at first. Being questioned doesn't automatically mean you're wrong. Change often begins with one person willing to be unpopular. Not everyone has to agree with you for your work to matter. Standing alone doesn't always mean you're standing on the wrong side. Improvement often looks like criticism before it looks like progress. It's okay to challenge something you deeply care about. You can respect a system and still want to improve it. Don't mistake resistance for failure.",
        action: "Write your opinion down before asking anyone else what they think. Give your own thoughts a chance to exist first."
    },
    {
        id: "decisions",
        numericId: "9",
        question: "How do I know I'm making the right decision?",
        figureName: "Søren Kierkegaard",
        image: "images/9-decisions.jpg",
        story: "Imagine a teenage girl from a small village with no education, no connections, and no experience in leadership. While her country is at war, she becomes deeply convinced that she has a role to play in changing its future. Almost nobody believes her. Powerful men laugh at her, question her, and assume she's either naïve or delusional. Yet she refuses to give up. Against all expectations, she earns their trust, helps lead an army to major victories, and changes the course of history. Eventually she's captured, put on trial, and executed before the age of twenty, but generations later she's remembered as one of France's greatest heroes.",
        thoughts: "Imagine a teenage girl from a small village with no education, no connections, and no experience in leadership. While her country is at war, she becomes deeply convinced that she has a role to play in changing its future. Almost nobody believes her. Powerful men laugh at her, question her, and assume she's either naïve or delusional. Yet she refuses to give up. Against all expectations, she earns their trust, helps lead an army to major victories, and changes the course of history. Eventually she's captured, put on trial, and executed before the age of twenty, but generations later she's remembered as one of France's greatest heroes.",
        action: "Imagine you've already made the decision. Sit with it for a day. Notice whether your body feels lighter or heavier."
    },
    {
        id: "midlife",
        numericId: "10",
        question: "Is it too late to start over?",
        figureName: "Mary Delany",
        image: "images/10-midlife.jpg",
        story: "Imagine a woman with what many people would call a successful life. She has a husband, children, financial stability, and knows exactly what tomorrow will look like. But somewhere along the way, she realizes that although her life looks complete from the outside, something inside her is still searching. Together with her husband, she decides to leave behind the life they've always known to pursue spiritual growth. She gives up comfort, status, and certainty in exchange for a completely different future. Over time, she becomes one of the most respected teachers in her tradition, showing that it's never too late to become someone new.",
        thoughts: "A good life can still leave room for a better-fitting one. It's okay to outgrow the version of yourself that built your current life. Starting over doesn't erase everything you've already built. Reinvention isn't beginning from zero. It's building on everything you've learned. Every chapter of your life prepares you for the next one. You don't become a different person overnight—you become more yourself over time. Your past isn't wasted just because your future looks different. You are allowed to want more than simply maintaining what you've built. The question isn't 'Am I too old?' The question is 'Am I finished growing?' Some dreams only make sense later in life. You don't have to choose between gratitude for your past and excitement for your future. Your life doesn't have to peak in your thirties. Growth has no expiration date.",
        action: "Write one sentence that begins: 'The next chapter of my life could...' Don't worry whether it's realistic."
    },
    {
        id: "reassurance",
        numericId: "11",
        question: "Will I ever feel like myself again?",
        figureName: "Rainer Maria Rilke",
        image: "images/11-identity.jpg",
        story: "Imagine a girl who has always experienced the world a little differently. Even as a child, she is unusually calm, joyful, and deeply reflective. She isn't interested in chasing success, recognition, or possessions like the people around her. She marries young, as expected, but continues living with the same quiet presence that makes others feel peaceful simply by being near her. Without trying to build a following or become a leader, people begin travelling long distances just to spend time with her and ask for guidance. She never claims to have all the answers—she simply lives in a way that inspires others to slow down and reconnect with themselves.",
        thoughts: "Different doesn't mean broken. You don't have to want what everyone else wants. Your pace doesn't have to match everyone else's. The qualities that make you feel different today may become your greatest strengths tomorrow. You don't have to explain why certain things matter to you. There is no 'correct' personality. Your sensitivity is part of your design, not a flaw to fix. You don't need to become louder to be heard. The world needs different kinds of people. Sometimes your greatest contribution comes from simply being who you are. You don't have to chase attention to make an impact. Your presence affects people more than you realize. Living authentically gives other people permission to do the same. Stop measuring yourself against lives you don't actually want.",
        action: "List three qualities you've always considered 'weird' about yourself. Then ask how each one has helped you at least once."
    },
    {
        id: "opinions",
        numericId: "12",
        question: "Why do I always feel different from everyone else?",
        figureName: "Emily Dickinson",
        image: "images/12-opinions.jpg",
        story: "Imagine one of the few women in the world teaching mathematics, science, and philosophy at a prestigious university. Students, politicians, and scholars come to hear her speak because of her intelligence. But the city around her is becoming increasingly divided by politics and religion. People stop caring about facts and begin choosing sides. Although she has many opportunities to stay silent or align herself with those in power, she refuses to compromise her principles. She continues teaching people to think critically and ask questions, even when it becomes dangerous. Eventually, political hatred costs her life, but she becomes a lasting symbol of intellectual courage.",
        thoughts: "You don't have to choose a side just because everyone else does. Curiosity is more valuable than certainty. Asking questions isn't a weakness. Changing your mind after learning something new is a sign of growth, not failure. You don't have to win every argument to stay true to your beliefs. Intelligence isn't knowing all the answers. It's staying open to better ones. Not everyone who disagrees with you is your enemy. It's possible to respect people without agreeing with them. Thinking for yourself sometimes means standing alone. Some conversations are worth leaving. Protect your peace more than your need to prove a point. The loudest voice in the room isn't always the wisest. Sometimes people reject ideas simply because they're unfamiliar. Your opinion doesn't become less valuable because it's unpopular. The strongest beliefs are the ones that can survive honest questions.",
        action: "The next time you disagree with someone, resist the urge to convince them. Practice saying, 'We simply see this differently.'"
    },
    {
        id: "community",
        numericId: "13",
        question: "I want to make a difference, but where do I even begin?",
        figureName: "Dorothy Day",
        image: "images/13-community.jpg",
        story: "Imagine a woman returning to her home country after studying abroad. She notices that forests are disappearing, rivers are drying up, and many rural women struggle to feed their families because the land no longer provides what it once did. Government leaders ignore the problem, and few people believe one person can make a difference. Instead of waiting for someone else to solve it, she starts by encouraging local women to plant trees in their own communities. What begins as a simple, practical idea grows into a movement involving millions of trees and thousands of women, eventually changing environmental policy across her country.",
        thoughts: "You don't have to solve the whole problem to improve part of it. Big changes often begin with surprisingly small actions. Start where you are, with what you have. Waiting until you're powerful usually means waiting forever. You don't need permission to begin. Small actions become powerful when many people repeat them. You can't do everything, but you can always do something. The first step doesn't have to be impressive. Don't underestimate the impact of consistency. Real change usually looks ordinary while it's happening. The people closest to the problem often hold the best solutions. Every movement begins with someone deciding to care. Focus on what you can influence, not on what you can't. One person rarely changes the world alone—but one person often starts the change.",
        action: "Pick one problem that bothers you and do one action that improves it today—even if no one notices."
    },
    {
        id: "health",
        numericId: "14",
        question: "Should I stay quiet, or should I say what I really think?",
        figureName: "Sojourner Truth",
        image: "images/14-health.jpg",
        story: "Imagine an ambitious young woman with dreams of becoming a doctor. At eighteen, everything changes when she's involved in a devastating bus accident that leaves her with severe injuries to her spine, pelvis, and legs. She spends months confined to bed and lives with chronic pain for the rest of her life. Doctors tell her she may never have children, and she undergoes dozens of surgeries. During her long recovery, she begins painting simply to pass the time. Instead of hiding her struggles, she paints them honestly—her body, her relationships, her heartbreak, and her identity. What starts as a way to survive eventually makes her one of the world's most celebrated artists.",
        thoughts: "Sometimes life doesn't give you back the person you used to be. Healing doesn't always mean returning to who you were. It's okay to grieve the future you thought you'd have. Losing one dream doesn't mean losing your purpose. Your body changing doesn't make you less you. You are more than your diagnosis. Your worth doesn't depend on what your body can or can't do. It's okay if your life looks different from what you imagined. Some endings quietly become new beginnings. Creativity can become a way of surviving what words can't explain. Your limitations may change your path, but they don't define your value. You don't have to hide your struggles to deserve love or respect. Some of the strongest people are simply the ones who kept living. There is still a version of your life worth discovering.",
        action: "Write down three parts of yourself that still exist today, even after everything that's changed."
    },
    {
        id: "voice",
        numericId: "15",
        question: "When will my voice finally feel like it matters?",
        figureName: "Hannah Arendt",
        image: "images/15-voice.jpg",
        story: "Imagine a schoolgirl who loves learning and dreams of becoming educated, but she grows up in a place where girls are increasingly forbidden from attending school. While many people stay silent out of fear, she begins speaking publicly about why education matters. Her words attract attention far beyond her community—and also from people who want to silence her. At fifteen, she survives an assassination attempt while riding home from school. Instead of giving up, she continues advocating for girls' education around the world, becoming the youngest person ever to receive the Nobel Peace Prize.",
        thoughts: "Your voice matters, even if it shakes. Staying quiet protects you in the moment. Speaking up can change the future. Not everyone will like your voice—and that's okay. Fear doesn't always mean you're making the wrong decision. Some things become easier to carry once they're spoken out loud. Speaking up doesn't always change other people, but it changes your relationship with yourself. Every time you stay silent against your values, you lose a small piece of yourself. You don't have to speak to everyone. Sometimes you only need to speak to the people who need to hear you. Using your voice isn't about being loud. It's about being honest. Silence can feel safe, but it also has a cost. You don't have to be fearless to be brave. Your story may become someone else's permission. The world changes because ordinary people decide not to stay silent.",
        action: "Say one honest thing today that you've been avoiding—not the biggest thing, just one true sentence."
    }
];

// Provide global access for vanilla scripts
window.lifeAreaData = lifeAreaData;
