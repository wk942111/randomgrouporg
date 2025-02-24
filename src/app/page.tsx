import { GroupGenerator } from '@/components/generator/GroupGenerator';

export default function Home() {
  return (
    <div className="space-y-12 py-8">
      {/* Main Title Section */}
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
          Random Group Generator
        </h1>
        <p className="mt-2 text-2xl md:text-3xl lg:text-4xl text-primary">
          Create Random Groups in Seconds
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
          The most trusted random group generator for educators and team leaders. Create balanced teams instantly with our free online tool. 
          Perfect for classrooms, workshops, and team activities - no registration needed.
        </p>
      </div>

      {/* Tool Section */}
      <div className="relative bg-bg-secondary py-12">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/20 via-accent/15 to-transparent" />
        <GroupGenerator />
      </div>

      {/* Instructions Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-text-primary text-center">How to Use Random Group Generator</h2>
        <p className="mt-2 text-xl text-text-secondary text-center mb-8">Quick, Simple, and Efficient</p>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">Enter Names</h3>
            <p className="text-text-secondary">
              Simply paste your list of names or upload a file. Our random group generator supports both TXT and CSV formats, 
              making it perfect for handling large teams or classroom rosters.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Set Group Parameters
            </h3>
            <p className="text-text-secondary">
              Choose your preferred group size or specify the number of groups. Our smart algorithm ensures 
              balanced random group distribution every time.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-text-primary">
              Generate & Share
            </h3>
            <p className="text-text-secondary">
              Instantly create random groups and export them in your preferred format. Share results easily 
              with your team or students. Not satisfied? Generate new groups with one click.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="container mx-auto px-4 bg-bg-secondary py-12 mt-12">
        <h2 className="text-3xl font-bold text-text-primary text-center">Random Group Generator Features</h2>
        <p className="mt-2 text-xl text-text-secondary text-center mb-8">Trusted by thousands of professionals worldwide</p>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Education & Training
            </h3>
            <p className="text-text-secondary">
              Create balanced study groups and project teams effortlessly. Our random group generator is the go-to tool 
              for educators looking to foster collaborative learning environments.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Professional Teams
            </h3>
            <p className="text-text-secondary">
              Streamline team formation for workshops, training sessions, and project assignments. Generate random groups 
              that promote diverse perspectives and equal participation.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Events & Activities
            </h3>
            <p className="text-text-secondary">
              Perfect for organizing team-building exercises, sports activities, and social events. Our random group generator 
              ensures fair and unbiased team distribution.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Fair Distribution Algorithm
            </h3>
            <p className="text-text-secondary">
              Our advanced random group generator uses a sophisticated algorithm to ensure truly random and balanced group 
              distribution, maintaining fairness in every scenario.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-text-primary text-center">Random Group Generator FAQ</h2>
        <p className="mt-2 text-xl text-text-secondary text-center mb-8">Everything you need to know</p>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              How does the random group generator work?
            </h3>
            <p className="text-text-secondary">
              Our random group generator uses a cryptographically secure algorithm to ensure truly random and unbiased group 
              assignments. Each member has an equal probability of being assigned to any group, guaranteeing fair distribution.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              What's the maximum group size?
            </h3>
            <p className="text-text-secondary">
              The random group generator can handle lists of up to 1000 members efficiently. For larger groups, 
              we recommend splitting them into smaller sessions for optimal performance and manageability.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Can I save and share my random groups?
            </h3>
            <p className="text-text-secondary">
              Yes! Export your random groups in TXT or CSV format. Share them instantly with your team or import them into 
              your favorite spreadsheet software. Visit randomgroup.org anytime to generate new groups.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Is my data safe?
            </h3>
            <p className="text-text-secondary">
              Absolutely. Our random group generator processes everything locally in your browser. We never store or transmit 
              your data to any server, ensuring complete privacy and security at randomgroup.org.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              How are groups balanced?
            </h3>
            <p className="text-text-secondary">
              The random group generator ensures optimal distribution by evenly allocating members across groups. If the total 
              can't be divided equally, our smart algorithm distributes extra members fairly.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              Can I regenerate my random groups?
            </h3>
            <p className="text-text-secondary">
              Yes! Generate new random groups as many times as you need with just one click. Each generation is completely 
              independent and random, giving you full control over your group formation process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
